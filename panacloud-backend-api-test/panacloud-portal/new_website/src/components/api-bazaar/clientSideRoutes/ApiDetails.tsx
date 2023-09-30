import React, { FC } from 'react';
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import { RouteComponentProps, useParams } from '@reach/router';
import mockData from '../ApiCard/mockData';
import { OpenInNew, HelpOutline, Edit } from '@material-ui/icons';
import { Image, Button } from '../../../components';
import useStyles from '../style';

// will available on /api-bazaar/:apiId
interface ApiDetailsInterface {
    description?: string;
    imageUrl: ApiContentProps['imageUrl'];
    title: ApiContentProps['title'];
    apiType: ApiContentProps['apiType'];
    companyName: ApiContentProps['companyName'];
    createdAt: string;
}

const ApiDetails: FC<RouteComponentProps> = ({ }) => {
    const classes = useStyles();
    const { apiId } = useParams();
    const { apiType, companyName, imageUrl, publishDate, ratings, title } = mockData[0];
    const description = "Online payment processing for internet businesses. Stripe is a suite of payment APIs that powers commerce for online businesses of all sizes, including fraud detection, send invoices, issue virtual and physical cards, get financing, manage business spend, and much more.";

    return (
        <div >
            <Grid container spacing={2} alignItems='flex-start' >

                {/* ///////////////////////  Left Column ///////////////////// */}
                <Grid xs={4} container item direction='column' justify='center' >
                    <Image height='44%' width='100%' url={"https://stripe.com/img/v3/home/social.png"} />
                    <Typography variant='h6' component='a' href='' align='right' >Edit API Schema</Typography>
                    <br />
                    <Grid container item justify='space-evenly' >
                        <Button color="green" >Subscribe</Button>
                        <Button color="green" >Publish</Button>
                    </Grid>
                    <br />
                    <div className={classes.borderBox}>
                        <Typography variant='h6' component='h3' className='_orange' ><b>My test subscriptions</b></Typography>
                        <Typography align='justify' >Usage Based Stripe Test Subscription 1</Typography>
                        <Typography align='justify' >Usage Based Stripe Test Subscription 2</Typography>
                    </div>
                </Grid>

                {/* ///////////////////////  Right Column ///////////////////// */}
                <Grid xs={8} item >
                    <Grid container >
                        <Grid container item xs={10} direction='column' >
                            <ApiContent apiType={apiType} title={title} companyName={companyName} imageUrl={imageUrl} />
                        </Grid >
                        <Grid container item xs={2} direction='column' justify='flex-start' alignItems='flex-end'  >
                            <Tooltip title='Edit API Details' >
                                <IconButton ><Edit fontSize='large' /></IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <br />
                    <div className={classes.borderBox} title='Api description'  >
                        <Typography align='justify' >{description}</Typography>
                    </div>
                    <br />
                    <ApiDevelopmentSteps />
                </Grid>

            </Grid>

        </div>
    )
}

export default ApiDetails;


interface ApiContentProps {
    title: string,
    companyName: string,
    apiType: ["GraphQL API"] | ["Rest Open API"] | ["GraphQL API", "Rest Open API"],
    imageUrl: string,
}
const ApiContent: FC<ApiContentProps> = ({ title, companyName, apiType }) => {
    return (
        <div >
            <Typography color='textPrimary' variant='h5' component='h3' >
                <b>{title}</b>
            </Typography>
            <Typography color='textSecondary' >By {companyName}</Typography>
            <Typography gutterBottom color='textSecondary' >
                Type: <b>{apiType.length === 1 ? apiType[0] : apiType.join(' and ')}</b>
            </Typography>
        </div >
    )
}

const ApiDevelopmentSteps: FC<{}> = () => {
    const link = {
        "nodeJS": "https://nodejs.org/en/download/",
        "awsAccount": "https://portal.aws.amazon.com/billing/signup?refid=em_127222&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/account",
        "awsCli": "https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html",
        "vsCode": "https://code.visualstudio.com/download",
    };
    const classes = useStyles();
    return (
        <div className={classes.borderBox}>
            <Typography variant='h6' component='h3' className='_orange' gutterBottom ><b>Let’s us start developing a Serverless SaaS API</b></Typography>
            <Typography>Install Node.js <a href={link.nodeJS} target='black'><OpenInNew /></a></Typography>
            <Typography>Get AWS Account <a href={link.awsAccount} target='black'><OpenInNew /></a></Typography>
            <Typography>Install AWS CLI <a href={link.awsCli} target='black'><OpenInNew /></a></Typography>
            <Typography>Install VS Code <a href={link.vsCode} target='black'><OpenInNew /></a></Typography>
            <br />
            <Typography>Open Command Prompt and give the following commands:</Typography>
            <Typography>npm -g install typescript <a href="" target='blank'><HelpOutline /></a></Typography>
            <Typography>npm install -g aws-cdk <a href="" target='blank'><HelpOutline /></a></Typography>
            <Typography>npm install –g panacloud-cdk <a href="" target='blank'><HelpOutline /></a></Typography>
            <Typography>panacloud project:create myproject <a href="" target='blank'><HelpOutline /></a></Typography>
            <br />
            <Typography>Download Panacloud Subscription Context File from Subscription Page <a href="" target='black'><OpenInNew /></a></Typography>
            <Typography>Learn to Develop Serverless SaaS APIs <a href="" target='black'><OpenInNew /></a></Typography>
        </div>
    )
}