import React from 'react';
import { Template as Layout } from '../../components/Layout/Layout.stories';
import LeftPane, { LeftPaneProps } from './LeftPane';
import ApiCard from './ApiCard';
import mockData from './ApiCard/mockData';
import { Grid } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import useStyles from './style';
import { Header } from './pageComponents'
import { Story, Meta } from '@storybook/react';
import { AuthState } from '../../redux/slices/userSlice';
import { apiType as APISaasTypeEnum } from '../../graphql/API';


export default {
    component: () => <div>ApiBazaar</div>,
    title: "Pages/ApiBazaar"
} as Meta

const authData = {
    heroImageUrl: "https://media-exp1.licdn.com/dms/image/C5103AQGhUxpE4MrBMA/profile-displayphoto-shrink_400_400/0/1566197788509?e=1622073600&v=beta&t=LUbyeztUeNI67JehbZ921FTMRKzUwV_gxyXuB8UjVys",
    username: "Zia"
}

const Template: Story<{ authstate: AuthState, leftPaneProps: LeftPaneProps, authData }> = ({ authstate, leftPaneProps, authData }) => {
    const classes = useStyles();
    return (
        <Layout authData={authData} >
            <div className={classes.container} >
                <Header authstate={authstate} />
                <Grid justify='space-between' container >
                    <LeftPane {...leftPaneProps} />
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

const apiSaasTypeList = [{ title: "All", count: 21 }, ...Object.values(APISaasTypeEnum).map(val => ({ title: val, count: 19 }))]

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    authstate: "SIGNED_OUT",
    leftPaneProps: { items: [{ listTitle: "Public APIs", listItems: apiSaasTypeList, listCount: 21 }] },
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    authstate: "SIGNED_IN",
    leftPaneProps: {
        items: [
            { listTitle: "Public APIs", listItems: apiSaasTypeList, listCount: 21 },
            { listTitle: "Company Private APIs", listItems: apiSaasTypeList, listCount: 21 },
            { listTitle: "My Published APIs", listItems: apiSaasTypeList, listCount: 21 },
            { listTitle: "My Under Development APIs", listItems: apiSaasTypeList, listCount: 21 },
            { listTitle: "My API Subscriptions", listItems: apiSaasTypeList, listCount: 21 },
        ]
    },
    authData

};