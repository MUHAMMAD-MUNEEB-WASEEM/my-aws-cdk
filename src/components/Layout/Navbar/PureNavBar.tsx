import React, { FC, createContext, useContext, useState } from "react";
import { Add, Message, Notifications, ArrowDropDown, Menu, Lock, Settings, ExitToApp, PersonAdd } from "@material-ui/icons";
import { Typography, Grid, Avatar, Badge, useMediaQuery, IconButton } from "@material-ui/core";
import useStyles, { IconButtonC } from './style';
import { NavBarProps } from './';
import Link, { navigate } from "gatsby-link";
import Drawer from './Drawer';
import mockData from './mockData';
import MenuButton from "./MenuButton";
import { UserDropDownMenu } from './SupportingComponents';

export interface PureNavBarProps extends NavBarProps {
    /**
     * staticData: this will be the static data get from contentful at build time.
     */
    staticData: typeof mockData,
    /**
     * currentPath: is the path of website's page.
     */
    currentPath: string,
}

/////////////////////////////////////////   PureNavBar   ///////////////////////////////////////////////////////
/**
 * 
 * @param staticData this will be the static data get from contentful at build time.
 * @param authData when the user is authenticated and logged in, this data will be required.
 * @param currentPath is the path of website's page, it represents that on which page the browser is currently present .
 * @returns JSX.element react functional component 
 */
const PureNavBar: FC<PureNavBarProps> = ({ staticData, authData, currentPath, ...others }) => {
    const classes = useStyles();
    const { allContentfulNavbarItems, allContentfulCompanyWebsite } = staticData;
    const logoUrl = allContentfulCompanyWebsite.nodes[0].logo.file.url;
    const links = allContentfulNavbarItems.nodes;
    links.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0));

    return (
        <GlobalProvider navLinks={links} logoUrl={logoUrl} currentPath={currentPath} authData={authData}  >
            <div className={classes.container} {...others} >
                <LeftNav data-testid='left-nav' />
                <MiddleNav data-testid='middle-nav' />
                <RightNav data-testid='right-nav' />
            </div>
        </GlobalProvider>
    )

}
export default PureNavBar;


/////////////////////////////////////////   LeftNav   ///////////////////////////////////////////////////////
// export interface LeftNavProps { logoUrl: string }
const LeftNav: FC = ({ ...others }) => {
    const widthUnder940px = useMediaQuery(`(max-width: 940px)`);
    const { logoUrl, navLinks, currentPath } = useContext(GlobalContext)!;
    // const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    return (
        <div {...others} >
            {
                widthUnder940px ?
                    <>
                        <IconButton onClick={() => { setDrawerOpen(!drawerOpen) }} ><Menu /></IconButton>
                        <Drawer currentPath={currentPath} logoUrl={logoUrl} anchor='left' setOpen={setDrawerOpen} navLinks={navLinks} open={drawerOpen} />
                    </> :
                    <Logo url={logoUrl} />
            }
        </div>
    )
}


/////////////////////////////////////////   MiddleNav   ///////////////////////////////////////////////////////
const MiddleNav: FC = ({ ...others }) => {
    const widthUnder940px = useMediaQuery(`(max-width: 940px)`);
    const { currentPath, logoUrl, navLinks } = useContext(GlobalContext)!;
    const classes = useStyles();

    return (
        <Grid container justify="center" {...others} >
            {widthUnder940px ?
                <Logo url={logoUrl} /> :
                <div style={{ width: '100%', padding: '0 10px' }} >
                    <ul className={classes.linksList} >
                        {
                            navLinks.map((link, idx) => {
                                return <Typography className={(currentPath.replace(/\//g, '') === link.url.replace(/\//g, '')) ? classes.selectedLink : ""} color='textPrimary' component="li" key={idx} >
                                    <Link to={link.url} > {link.name} </Link>
                                </Typography>
                            })
                        }
                    </ul>
                </div>
            }
        </Grid>
    )
}


/////////////////////////////////////////   RightNav   ///////////////////////////////////////////////////////
const RightNav: FC = ({ ...others }) => {
    const widthUnder940px = useMediaQuery(`(max-width: 940px)`);
    const { authData, currentPath } = useContext(GlobalContext)!;
    const loginSignUpLinks = [{ title: "Sign Up", slug: "/signup/" }, { title: "Login", slug: "/login/" }]
    const classes = useStyles();
    const navigateToUserProfile = () => {
        navigate('/profiles');
    }

    if (authData && authData.username) {
        return (
            <div className={classes.heroSection} data-testid='hero-section' {...others}  >
                {widthUnder940px ?
                    <div>
                        <UserDropDownMenu
                            authData={authData}
                            trigButton={(handleClick) => <IconButton onClick={handleClick} size='small' ><Avatar src={authData.heroImageUrl} /></IconButton>}
                        />
                    </div> :
                    <>
                        <div className={`${classes.heroAvatar} ${classes.hideUnder1150px}`} onClick={navigateToUserProfile} > <Avatar src={authData.heroImageUrl} /><Typography>{authData.username}</Typography> </div>
                        <div><IconButtonC><Add /></IconButtonC></div>
                        <div><IconButtonC><Badge badgeContent={16} color="secondary"><Message /></Badge></IconButtonC></div>
                        <div><IconButtonC><Badge badgeContent={31} max={20} color="secondary"><Notifications /></Badge></IconButtonC></div>
                        <div>
                            <UserDropDownMenu
                                authData={authData}
                                trigButton={(handleClick) => <IconButtonC onClick={handleClick} size='small' ><ArrowDropDown /></IconButtonC>}
                            />
                        </div>
                    </>
                }
            </div>
        )
    }

    return (
        <Grid container justify="flex-end" data-testid='signup-login-section' {...others} >
            {widthUnder940px ?
                <>
                    <MenuButton
                        // menuItems={loginSignUpLinks.map(val => ({ id: val.slug, item: val.title }))}
                        menuItems={[
                            { id: loginSignUpLinks[1].slug, link: loginSignUpLinks[1].slug, item: <Grid container alignItems='center' ><ExitToApp style={{ marginRight: '10px' }} /><Typography>{loginSignUpLinks[1].title}</Typography></Grid> },
                            { id: loginSignUpLinks[0].slug, link: loginSignUpLinks[0].slug, item: <Grid container alignItems='center' ><PersonAdd style={{ marginRight: '10px' }} /><Typography>{loginSignUpLinks[0].title}</Typography></Grid> },
                        ]}
                        // onItemClick={(itemId) => { navigate(itemId) }}
                        trigButton={(handleClick) => <IconButton onClick={handleClick} ><Lock /></IconButton>}
                    />
                </> :
                <ul className={classes.linksList} style={{ margin: '0' }} >
                    {
                        loginSignUpLinks.map((url, idx) => (
                            <Typography className={(currentPath.replace(/\//g, '') === url.slug.replace(/\//g, '')) ? classes.selectedLink : ""} component="li" key={idx} >
                                <Link to={url.slug} > {url.title} </Link>
                            </Typography>
                        ))
                    }
                </ul>}
        </Grid>
    )

}

const Logo: FC<{ url: string }> = ({ url }) => {
    const classes = useStyles();
    return (
        <Link to='/' ><img className={classes.logo} src={url} alt="logo" /></Link>
    )
}

/////////////////////////////////////////  Navbar Global Provider   ///////////////////////////////////////////////////////
interface GlobalContextProps {
    navLinks: typeof mockData.allContentfulNavbarItems.nodes,
    logoUrl: string,
    currentPath: string,
    authData?: PureNavBarProps['authData']
}
const GlobalContext = createContext<GlobalContextProps | null>(null);
const GlobalProvider: FC<GlobalContextProps> = ({ navLinks, logoUrl, currentPath, authData, children }) => {
    // const [globalState, setGlobal] = useState({ currentPath, staticData, authData });
    return <GlobalContext.Provider value={{ navLinks, logoUrl, currentPath, authData }} >
        {children}
    </GlobalContext.Provider>
}