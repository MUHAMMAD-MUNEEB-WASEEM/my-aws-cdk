import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PureHeader from "./PureHeader";

function Header() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCompanyWebsite {
        nodes {
          name
          mission {
            mission
          }
          image {
            file {
              url
            }
          }
        }
      }
    }
  `);
  const { allContentfulCompanyWebsite } = data;
  return (
    <div data-testid='header'>
      <PureHeader data={allContentfulCompanyWebsite?.nodes[0]} />
    </div>
  );
}

export default Header;
