import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import useStyles from './style';
import Image from '../../Image';

export interface ApiCardProps {
    title: string,
    companyName: string,
    publishDate: number,
    apiType: ["GraphQL API"] | ["Rest Open API"] | ["GraphQL API", "Rest Open API"],
    imageUrl: string,
    ratings: (1 | 2 | 3 | 4 | 5)[],
}

const ApiCard: FC<ApiCardProps> = ({ title, companyName, publishDate, imageUrl, apiType, ratings }) => {
    const date = new Date(publishDate);
    const classes = useStyles();
    // const _publishDate = `${date.get()} ${date.getDate()}, ${date.getFullYear()}`

    return (
        <div className={classes.container} >
            <Image height='100px' width='220px' url={imageUrl} style={{ marginRight: "30px" }} />
            <div className={classes.apiContent} >
                <Typography color='textPrimary' variant='h5' component='h3' ><b>{title}</b></Typography>
                <Typography color='textSecondary' >By {companyName} | {date.toDateString()}</Typography>
                <Typography color='textSecondary' >Type: {apiType.length === 1 ? apiType[0] : apiType.join(' and ')}</Typography>
                <div className={classes.apiRating} >
                    <div><Rating name="half-rating" defaultValue={sum(ratings) / ratings.length} precision={0.5} readOnly /></div>
                    <Typography><ExpandMore fontSize='small' /></Typography>
                    <Typography>{ratings.length}</Typography>
                </div>
            </div>
        </div>
    )
}

export default ApiCard;

function sum(numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0)
}