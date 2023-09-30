import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SwipeableDrawer, List, ListItem, ListSubheader, ListItemText } from '@material-ui/core';
// import { ExpandLess, ExpandMore, AccountCircle, Home, ListAlt, Contacts, Info } from '@material-ui/icons';
import mockData from './mockData';
import { navigate } from 'gatsby-link';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme: Theme) => createStyles({
    mainList: { width: "340px" },
    nested: { paddingLeft: theme.spacing(4), },
    collapse: { backgroundColor: "whitesmoke", },
    listHead: { display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '50px 0' },
    selectedLink: { color: 'blue', fontWeight: 'bold' }
}));

export interface Props {
    navLinks: typeof mockData.allContentfulNavbarItems.nodes;
    logoUrl: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    anchor?: "bottom" | "left" | "right" | "top";
    currentPath?: string;
}

const Drawer: FC<Props> = ({ open, setOpen, navLinks, logoUrl, currentPath, anchor = "left" }) => {

    const classes = useStyles();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if (open) { setOpen(open) }
        else { setOpen(open) }
    };

    return (
        <div >
            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <List className={classes.mainList}
                    subheader={
                        <ListSubheader className={classes.listHead} component="div" id="nested-list-subheader">
                            <Link to='/' ><img width='150px' src={logoUrl} /></Link>
                        </ListSubheader>
                    }
                >
                    {navLinks.map((link, idx) => {
                        const isSelected = (currentPath?.replace(/\//g, '') === link.url.replace(/\//g, ''))
                        return <ListItem key={idx} button onClick={() => { setOpen(false); navigate(link.url) }} >
                            {/* <ListItemIcon  ><Home color='inherit' /></ListItemIcon> */}
                            <ListItemText classes={{ primary: isSelected ? classes.selectedLink : undefined }} primary={link.name} />
                        </ListItem>
                    })}


                </List>
            </SwipeableDrawer>
        </div>
    );
}

export default Drawer;