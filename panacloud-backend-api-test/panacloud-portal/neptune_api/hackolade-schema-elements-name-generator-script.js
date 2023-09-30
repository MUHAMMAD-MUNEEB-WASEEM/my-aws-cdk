const fs = require('fs');
// const { collections, relationships } = require('./graphDatabaseScheme.json');
const { collections, relationships } = require('./unicorn_latest_graphdb.json');
// const { } = require('./schema.json');
const fileOutput = './lambda-layer/graphdb-elements-name.json';

let schema = { vertex: {}, edge: {} };


// creating vertex
for (const vertex of collections) {
    schema.vertex[vertex.collectionName] = {
        L: vertex.collectionName,
        "prop": {}
    }

    for (const props of vertex.properties) {
        schema.vertex[vertex.collectionName]['prop'][props.name] = {
            N: props.name
        }
        /* if property has enum, then map its values */
        if (props.enum) {
            schema.vertex[vertex.collectionName]['prop'][props.name].V = {}
            props.enum.forEach((val) => {
                schema.vertex[vertex.collectionName]['prop'][props.name].V[val] = val
            })
        }

    }
}


// creating edges
for (const edge of relationships) {
    schema.edge[edge.name] = {
        L: edge.name,
        "prop": {}
    }

    for (const props of edge.properties) {
        schema.edge[edge.name]['prop'][props.name] = {
            N: props.name
        }
        /* if property has enum, then map its values */
        if (props.enum) {
            schema.edge[edge.name]['prop'][props.name].V = {}
            props.enum.forEach((val) => {
                schema.edge[edge.name]['prop'][props.name].V[val] = val
            })
        }

    }
}



const jsonString = JSON.stringify(schema, null, 2);
fs.writeFileSync(fileOutput, jsonString, { encoding: "utf-8" });