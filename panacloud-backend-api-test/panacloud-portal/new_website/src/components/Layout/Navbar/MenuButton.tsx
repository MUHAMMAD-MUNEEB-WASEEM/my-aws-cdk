import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';

interface MenuButtonProps {
    menuItems: { item: (string | JSX.Element | number), id: string }[],
    onItemClick?: (itemId: string) => void;
}

const MenuButton: FC<MenuButtonProps> = ({ children, menuItems, onItemClick }) => {
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
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {children}
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                // keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose()}
            >
                {
                    menuItems.map((item, idx) => {
                        return <MenuItem key={idx} onClick={handleClose(item.id)}>{item.item}</MenuItem>
                    })
                }
            </Menu>
        </div>
    );
}

export default MenuButton;