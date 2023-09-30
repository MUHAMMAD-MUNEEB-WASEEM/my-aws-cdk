import React, { FC } from 'react';
import { graphql } from "gatsby";
import { Layout } from '../components';
import TrainingBody from '../components/training';

export interface Props {  
    data: any;
    color: "grey" | "black";
    layout: "tp1" | "tp2" | "tp3";
  }

  const Training: FC<Props> = ({ data, color="black", layout="tp3" }) => {
      return (
          <Layout>
              <TrainingBody data={data} layout={layout} color={color}/>
          </Layout>
      )
  }

export default Training;

export const query = graphql`
  query TrainingPageQuery {
    allContentfulTraining {
      nodes {
        subTitle
        headline
        title
        trainingProgram {
          status {
            status
          }
          slug
          preRequisites
          title
          segments {
            segmentNumber
            title
          }
          titleImage {
            file {
              url
            }
          }
        }
        image {
          file {
            url
          }
        }
      }
    }              
  }  
  `;