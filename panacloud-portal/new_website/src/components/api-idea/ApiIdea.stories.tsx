import React from 'react';
import { Template as Layout } from '../Layout/Layout.stories';
import LeftPane from './LeftPane';
import ApiCard from './ApiCard';
import mockData from './ApiCard/mockData';
import { Grid } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import useStyles from './style';
import { Header } from './pageComponents'
import { Story, Meta } from '@storybook/react';


export default {
    component: () => <div>ApiIdea</div>,
    title: "Pages/ApiIdea"
} as Meta


const Template: Story<{}> = ({ }) => {
    const classes = useStyles();
    return (
        <Layout  >
            <div className={classes.container} >
                <Header />
                <Grid justify='space-between' container >
                    <LeftPane />
                    <div className={classes.apiCardList} >
                        {mockData.map((apidata, idx) => {
                            return <ApiCard {...apidata} key={idx} />
                        })}
                    </div>
                </Grid>
            </div>
        </Layout>
    )
}

export const Primary = Template.bind({});
Primary.args = {};