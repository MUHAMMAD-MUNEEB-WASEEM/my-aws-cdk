import React, { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";
import PureFooter, { } from './PureFooter';

export interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {

  const data = useStaticQuery(graphql`
    query {
      allContentfulFooter {
        nodes {
          text
        }
      }
    }
  `);

  return (
    <PureFooter staticData={data} />
  );
}

export default Footer;
