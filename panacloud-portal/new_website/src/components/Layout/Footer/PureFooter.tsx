import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from './style';

export interface PureFooterProps {
    staticData: any
}

const PureFooter: FC<PureFooterProps> = ({ staticData }) => {
    const classes = useStyles();

    const { allContentfulFooter } = staticData;
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} sm={12}>
                    <div className={classes.footer}>
                        {allContentfulFooter.nodes[0].text}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default PureFooter;