import React, { FC, useEffect, useState } from 'react';
import useStyles from './style';
import { ListItemText, Collapse, List, ListItem, Typography } from '@material-ui/core';
// import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { getPublicApisCountByTypeOutput, apiType as ApiSaasTypeEnum } from '../../../graphql/API';

export interface LeftPaneProps {
    items: ListItemType[],
    onListItemClick?: ExpandableListItemProps['onListItemClick']
    defaultselectedItem?: ExpandableListItemProps['selectedItem']
}

const LeftPane: FC<LeftPaneProps> = ({ items, onListItemClick, defaultselectedItem }) => {
    const classes = useStyles();
    return (
        <div className={classes.container} >
            <List >
                {
                    items.map((item, idx) => {
                        return <ExpandableListItem
                            listTitle={item.listTitle}
                            listItems={item.listItems}
                            listCount={item.listCount} key={idx}
                            onListItemClick={onListItemClick}
                            selectedItem={defaultselectedItem}
                        />
                    })
                }
            </List>
        </div >
    )
}

export default LeftPane;

type ListNestedItemType = { title?: string, count?: number }
interface ListItemType {
    listTitle?: string,
    listCount?: number,
    listItems?: ListNestedItemType[],
}

interface ExpandableListItemProps extends ListItemType {
    onListItemClick?: (listTitle: ListItemType['listTitle'], listNestedItemTitle: ListNestedItemType['title']) => void
    selectedItem?: { listTitle: ListItemType['listTitle'], listNestedItemTitle: ListNestedItemType['title'] }
}


const ExpandableListItem: FC<ExpandableListItemProps> = ({ listItems, listTitle, listCount, onListItemClick, selectedItem }) => {
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();
    const [currentSelectedItem, setCurrentSelectedItem] = useState<ListNestedItemType['title']>("");

    const handleClick = (listTitle: ListItemType['listTitle'], listNestedItemTitle: ListNestedItemType['title']) => () => {
        // setCurrentSelectedItem(listNestedItemTitle);
        onListItemClick && onListItemClick(listTitle, listNestedItemTitle)
    }

    useEffect(() => {
        if (
            selectedItem &&
            selectedItem.listTitle === listTitle &&
            listItems &&
            listItems.findIndex(item => item.title === selectedItem.listNestedItemTitle) !== -1
        ) {
            setOpen(true);
            setCurrentSelectedItem(selectedItem.listNestedItemTitle)
        }

    }, [selectedItem])

    return (
        <>
            <ListItem button onClick={() => { setOpen(!open) }} >
                <ListItemText primary={listTitle} classes={{ primary: classes.listItemText }} />
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                <Typography>{listCount || 0}</Typography>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse} >
                <List component="div" disablePadding >
                    {listItems?.map(({ title, count }, idx) => {
                        return <ListItem button className={classes.nested} key={idx} onClick={handleClick(listTitle, title)} component='div'>
                            <ListItemText
                                primary={title}
                                classes={{ primary: currentSelectedItem === title ? classes.selectedItem : undefined }}
                            />
                            <Typography>{count || 0}</Typography>
                        </ListItem>
                    })}
                </List>
            </Collapse>
        </>
    )
}


// const defaultListItems = [{ title: "All", count: 21 }, ...Object.values(ApiSaasTypeEnum).map(val => ({ title: val, count: 0 }))]