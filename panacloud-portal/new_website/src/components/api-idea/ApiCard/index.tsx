import React, { FC, HTMLAttributes } from 'react';
import { Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import useStyles from './style';
import Image from '../../Image';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


export interface ApiCardProps {
    title: string,
    companyName: string,
    publishDate: number,
    apiType: ["GraphQL API"] | ["Rest Open API"] | ["GraphQL API", "Rest Open API"],
    imageUrl: string,
    like: Boolean[],
    disLike: Boolean[],
}

const ApiCard: FC<ApiCardProps & HTMLAttributes<HTMLDivElement>> = ({ title, companyName, publishDate, imageUrl, apiType, like, disLike, ...others }) => {
    const date = new Date(publishDate);
    const classes = useStyles();

    // const _publishDate = `${date.get()} ${date.getDate()}, ${date.getFullYear()}`

    return (
        <div {...others} className={classes.container} >
            <Image height='100px' width='220px' url={imageUrl} style={{ marginRight: "30px" }} />
            <div className={classes.apiContent} >
                <Typography color='textPrimary' variant='h5' component='h3'><b>{title}</b></Typography>
                <Typography color='textSecondary' >By {companyName} | {date.toDateString()}</Typography>
                <Typography color='textSecondary' >Type: {apiType.length === 1 ? apiType[0] : apiType.join(' and ')}</Typography>
                
                <div className= {classes.rating}>
                
                    <div className={classes.like}>
                        <Typography>{like.length} Likes</Typography>
                        <div className={classes.thumbs}>
                            <ThumbUpAltOutlinedIcon ></ThumbUpAltOutlinedIcon>
                        </div>
                    </div>
                
                    <div className={classes.dislike}>
                        <Typography>{disLike.length} Dislikes</Typography>
                        <div className={classes.thumbs}>
                            <ThumbDownIcon ></ThumbDownIcon>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default ApiCard;
