import React, { FC } from 'react';
import useStyles from './style';

export interface PureLayoutProps {
    Navbar: FC,
    Footer: FC,
    children: React.ReactNode
}

const PureLayout: FC<PureLayoutProps> = ({ children, Footer, Navbar }) => {
    const classes = useStyles();

    return (
        <div className={classes.container} >
            <div style={{ flexShrink: "initial" }} > <Navbar /> </div>
            <div style={{ flex: '1 0 auto' }} >
                <div className={classes.body} >{children}</div>
            </div>
            <div style={{ flexShrink: "initial" }} > <Footer /> </div>
        </div>
    )
};

export default PureLayout;