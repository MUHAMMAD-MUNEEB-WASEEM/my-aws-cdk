import React, { FC, useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import PureNavBar from './PureNavBar';

export type AuthDataType = { username: string, heroImageUrl: string }
export interface NavBarProps {
  /**
   * authData: when the user is authenticated and logged in, this data will be required.
   */
  authData?: AuthDataType
}

const NavBar: FC<NavBarProps> = ({ authData }) => {

  const [currentPath, setCurrentPath] = useState<string>('');
  const data = useStaticQuery(graphql`
    query {
      allContentfulNavbarItems {
        nodes { name order url }
      }
      allContentfulCompanyWebsite {
        nodes {
          logo {
            file { url fileName }
          }
        }
      }
    }
  `);

  useEffect(() => {
    let mount = true;
    mount && setCurrentPath(window.location.pathname);
    return () => { mount = false }
  })

  return <PureNavBar data-testid='pure-navbar' staticData={data} authData={authData} currentPath={currentPath} />

}
export default NavBar;

