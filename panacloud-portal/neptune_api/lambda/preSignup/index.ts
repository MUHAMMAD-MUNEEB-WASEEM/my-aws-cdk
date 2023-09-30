import * as gremlin from 'gremlin';
import {v4 as uuidv4} from 'uuid';
const id = gremlin.process.t.id
import * as schema from '../../lambda-layer/graphdb-elements-name.json';
var AWS = require('aws-sdk');


const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

exports.handler = async (event: any, context: any, callback: any) => {

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

    console.log(event);

    let userAttributes = event.request.userAttributes;


    var params = {
        UserPoolId: event.userPoolId, /* required */
        // AttributesToGet: [
        //   'STRING_VALUE',
        //   /* more items */
        // ],
        Filter: `email=\"${userAttributes.email}\"`,
       // Limit: 'NUMBER_VALUE',
        //PaginationToken: 'STRING_VALUE'
      };

      try{
     const res =  await cognitoidentityserviceprovider.listUsers(params).promise()
        
     if (res.Users.length !== 0){
        callback('A user with this email address already exists')
     }

    }
    catch(e){
        console.log(e)
        callback('An unexpected error occured')
    }




    const {edge,vertex} = hackolade_graphdb

    const dc = new DriverRemoteConnection('wss://' + process.env.NEPTUNE_ENDPOINT + ':8182/gremlin',{});

    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    const __ = gremlin.process.statics
    const id = gremlin.process.t.id
    const secretText = uuidv4();
    const timeStamp = Date.now()


    try {
        const user_type = await g.V(vertex.userType.prop.id.V.userTypeNormal)
        .fold()
        .coalesce(__.unfold(), 
            g.addV(vertex.userType.L)
            .property(id, vertex.userType.prop.id.V.userTypeNormal)
            .property( vertex.userType.prop.name.N, vertex.userType.prop.name.V.NORMAL)
        ).next();

        const profile_status = await g.V(vertex.profileStatus.prop.id.V.profileStatusUnpublished).fold().coalesce(__.unfold(), 
            g.addV(vertex.profileStatus.L)
            .property(id, vertex.profileStatus.prop.id.V.profileStatusUnpublished)
            .property(vertex.profileStatus.prop.name.N, vertex.profileStatus.prop.name.V.UNPUBLISHED)
        ).next()

        const create_user = await g.V(event.userName).
            fold().
            coalesce(__.unfold(), 
                g.addV(vertex.user.L)
                .property(id, event.userName)
               // .property(vertex.user.prop.phoneNumber.N, userAttributes.phone_number)
                .property(vertex.user.prop.email.N, userAttributes.email)
                .property(vertex.user.prop.secretText.N, secretText).as('new_user')
                .property(vertex.user.prop.dateCreated.N, timeStamp)
                .addE(edge.has_type.L).from_('new_user').to(user_type.value)
                .addE(edge.has_status.L).from_('new_user').to(profile_status.value).property(edge.has_status.prop.timeStamp.N,timeStamp)
            ).next();


        console.log("create_user", create_user)

        event.response.autoConfirmUser = false;
        event.response.autoVerifyEmail = false;
      //  event.response.autoVerifyPhone = false;


        return event
    }
    catch(err){
        console.log(err)
         callback('failed to add user to neptune')
    }

}