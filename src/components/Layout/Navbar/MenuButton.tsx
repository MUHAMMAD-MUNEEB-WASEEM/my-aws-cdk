import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'gatsby-link';
// import { makeStyles } from '@material-ui/core';


type MenuItemType = { item: (string | JSX.Element | number), id: string, link?: string }
export interface MenuButtonProps {
    /**
     * trigButton: takes and element to use as menu trigger and click handling
     */
    trigButton: (handleClick: (e) => void) => React.ReactNode,
    menuItems: MenuItemType[],
    onItemClick?: (itemId: MenuItemType['id']) => void;
    width?: React.CSSProperties['width'];
}

const MenuButton: FC<MenuButtonProps> = ({ trigButton, menuItems, onItemClick, width }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (item?: string) => () => {
        setAnchorEl(null);
        onItemClick && item && onItemClick(item)
    };

    return (
        <div>
            {trigButton(handleClick)}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                // keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose()}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        width: width,
                    },
                }}
            >
                {
                    menuItems.map((item, idx) => {
                        if (item.link) {
                            return <MenuItem component={Link} to={item.link} key={idx} onClick={handleClose(item.id)}>
                                {item.item}
                            </MenuItem>
                        }
                        return <MenuItem key={idx} onClick={handleClose(item.id)}>
                            {item.item}
                        </MenuItem>
                    })
                }
            </Menu>
        </div>
    );
}

export default MenuButton;