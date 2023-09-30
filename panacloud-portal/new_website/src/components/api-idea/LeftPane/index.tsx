import React, { FC, useState } from 'react';
import useStyles from './style';
import { ListItemText, Collapse, List, ListItem, Typography } from '@material-ui/core';
// import { ExpandLess, ExpandMore } from '@material-ui/icons';

export interface Props {

}

const LeftPane: FC<Props> = ({ }) => {
    const classes = useStyles();
    return (
        <div className={classes.container} >
            <List >
                {
                    Object.entries(data).map((item, idx) => {
                        return <ExpandableListItem listName={item[0]} listItems={item[1]} key={idx} />
                    })
                }
            </List>
        </div >
    )
}

export default LeftPane;

const ExpandableListItem: FC<{ listName: string, listItems: string[] }> = ({ listItems, listName }) => {
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();
    return (
        <>
            <ListItem button onClick={() => { setOpen(!open) }} >
                <ListItemText primary={listName} classes={{ primary: classes.listItemText }} />
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                <Typography>{listItems.length}</Typography>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse} >
                <List component="div" disablePadding>
                    {listItems.map((name, idx) => {
                        return <ListItem button className={classes.nested} key={idx} >
                            <ListItemText primary={name} />
                        </ListItem>
                    })}
                </List>
            </Collapse>
        </>
    )
}

const data = {
    "Public APIs": [
        "CRM",
        "ERP",
        "ACCOUNTING",
        "PM",
        "CMS",
        "COMMUNICATION",
        "ECOMMERCE",
        "HRM",
        "PAYMENT_GATEWAY",
        "BILLING",
        "FINANCE",
        "EDUCATION",
        "MEDICAL",
        "MUSIC",
        "NEWS",
        "SOCIAL_NETWORKING",
        "WEATHER",
        "LIFESTYLE",
        "PRODUCTIVITY",
        "SPORTS",
        "TRAVEL",
        "FOOD",
        "PHOTO_VIDEO",
        "UTILITIES",
        "DATA",
        "AI",
        "IOT",
        "BLOCKCHAIN_CRYPTO",
        "BUSINESS",
        "REFERENCE",
        "HEALTH_FITNESS",
    ],
    "Company Private APIs": ["Todo API", "Quiz API"],
    "My Published APIs": ["Quiz API", "Todo API"],
    "My Under Development APIs": ["Messenger API", "Images API"],
    "My API Subscriptions": ["Stripe API", "Google Maps"],
}