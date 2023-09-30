import React, { FC, useState } from 'react';
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import { RouteComponentProps, useParams } from '@reach/router';
import mockData from '../ApiCard/mockData';
import { OpenInNew, HelpOutline, Edit } from '@material-ui/icons';
import { Image, Button } from '../../../components';
import useStyles from '../style';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import MiddleColumn from './feed/MiddleColumn';

interface PostProps {
    postImage: string;
    likesCount: number;
}


// will available on /api-idea/:apiId
interface ApiDetailsInterface {
    description?: string;
    imageUrl: ApiContentProps['imageUrl'];
    title: ApiContentProps['title'];
    apiType: ApiContentProps['apiType'];
    companyName: ApiContentProps['companyName'];
    createdAt: string;
    
}
const ButtonProps = {
    startIcon: <ThumbDownIcon fontSize='large'/>
}

const ApiDetails: FC<RouteComponentProps> = ({ }) => {
    const classes = useStyles();
    const { productId } = useParams();
    const { apiType, companyName, imageUrl, publishDate, like, disLike, title } = mockData[0];
    const description = "Online payment processing for internet businesses. Stripe is a suite of payment APIs that powers commerce for online businesses of all sizes, including fraud detection, send invoices, issue virtual and physical cards, get financing, manage business spend, and much more.";
    const [isLoading, setLoading] = useState(false)
    return (
        <div >
            <Grid container spacing={2} alignItems='flex-start' >

                {/* ///////////////////////  Left Column ///////////////////// */}
                <Grid xs={4} container item direction='column' justify='center' >
                    <Image height='44%' width='100%' url={"https://makkahmobiles.com/wp-content/uploads/2020/09/payment-methods-with-circle_23-2147674741-1-750x423@2x.jpg"} />

                    {/*like and dislike*/}
                    <Grid container item justify='space-evenly'>
                    {/*without buttons*/}
                        {/* <div className={classes.like}>
                            <Typography>{like.length} Likes</Typography>
                            <div className={classes.thumbs}>
                                <ThumbUpAltOutlinedIcon ></ThumbUpAltOutlinedIcon>
                            </div>
                        </div> */}

                        {/* <div className={classes.dislike}>
                            {/* <Typography>{disLike.length} Dislikes</Typography> */}
                            {/* <div className={classes.thumbs}>
                                <ThumbDownIcon ></ThumbDownIcon>
                            </div> 
                        </div> */}

                        {/*with Buttons*/}
                            <Button className={classes.likeButton}> <span>{like.length} Likes </span>
                                <ThumbUpAltOutlinedIcon  fontSize="large" className={classes.thumbsMaterial}/>
                             </Button>

                             <Button className={classes.disLikeButton}> {disLike.length} Dislikes
                                <span><ThumbDownIcon  fontSize="large" className={classes.thumbsMaterial}/></span>
                             </Button>                           
                    </Grid>
                    <br/>

                    <Grid xs={7} container item direction='column'>
                            <Typography variant='h6' component='a' className={classes.suggestSchema} href='' align='right' >Add Suggested API Schema</Typography>
                    </Grid>

                    <br/>
                    <div className={classes.borderBox}>
                        <Typography variant='h6' component='h3' className='_orange' ><b>Suggested API Schema</b></Typography>
                        <Typography align='justify' >GraphQl schema by Huma Hanif</Typography>
                        <Typography align='justify' >RestFul Open API by Waris</Typography>
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
                    <MiddleColumn isLoading={isLoading}/>
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

