import React, { FC, ButtonHTMLAttributes } from 'react';
import useStyles, { StyleBtnProps } from './style';

export interface Props extends StyleBtnProps {

}

const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, color, ...others }) => {
    const classes = useStyles({ color });
    return (
        <button className={classes.btn} {...others} >
            <span>{children}</span>
        </button>
    )
}

export default Button;
