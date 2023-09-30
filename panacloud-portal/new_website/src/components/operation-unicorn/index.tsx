import React, { FC } from 'react';
import { Typography} from '@material-ui/core';
import { useStaticQuery, graphql, Link } from "gatsby"
import useStyles from './style';



const OperationUnicorn: FC = () => {
   const classes = useStyles();  
    const data =  useStaticQuery(graphql`{
      allContentfulOperationUnicorn {
        edges {
          node {
            images {
              fluid {
                src
              }
              title
            }
            description {
              description
            }
            title
          }
        }
      }
    }
    `
    )

    return (
      
        <div className={classes.container}>
          {console.log(data.allContentfulOperationUnicorn.edges[0].node.images[0].title)}
          <Typography className={classes.title}> {data.allContentfulOperationUnicorn.edges[0].node.title} </Typography>
          <img  className={classes.intro} src={data.allContentfulOperationUnicorn.edges[0].node.images[0].fluid.src} alt={data.allContentfulOperationUnicorn.edges[0].node.images[0].title}></img> 
          <br/> 
          <Typography className={classes.bodytext}> {data.allContentfulOperationUnicorn.edges[0].node.description.description} </Typography>
        </div>
        )
}

export default OperationUnicorn;
