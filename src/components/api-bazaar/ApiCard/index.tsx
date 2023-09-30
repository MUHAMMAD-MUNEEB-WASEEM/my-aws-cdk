import React, { FC, HTMLAttributes } from 'react';
import { Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import useStyles from './style';
import Image from '../../Image';
import { apiKind } from '../../../graphql/API';

export interface ApiCardProps {
    apiId?: string,
    title?: string,
    ownerName?: string,
    publishDate?: number,
    apiKind?: apiKind
    imageUrl?: string,
    ratings?: (1 | 2 | 3 | 4 | 5)[],
}

const defaultApiImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqLHvHA0uELIEWufcT5SLiztXtPvk7jk9gw&usqp=CAU"
const ApiCard: FC<ApiCardProps & HTMLAttributes<HTMLDivElement>> = ({ apiId, title, ownerName, publishDate, imageUrl = defaultApiImage, apiKind, ratings, ...others }) => {
    const _publishDate = publishDate ? new Date(publishDate).toDateString() : "publish date not found";
    const classes = useStyles();
    // const _publishDate = `${date.get()} ${date.getDate()}, ${date.getFullYear()}`

    return (
        <div {...others} className={classes.container} >
            <Image height='100px' width='220px' url={imageUrl} style={{ marginRight: "30px" }} />
            <div className={classes.apiContent} >
                <Typography color='textPrimary' variant='h5' component='h3' ><b>{title}</b></Typography>
                <Typography color='textSecondary' >By {ownerName} | {_publishDate}</Typography>
                <Typography color='textSecondary' >Type: {apiKind}</Typography>
                {ratings && <div className={classes.apiRating} >
                    <div><Rating name="half-rating" defaultValue={sum(ratings) / ratings.length} precision={0.5} readOnly /></div>
                    <Typography><ExpandMore fontSize='small' /></Typography>
                    <Typography>{ratings.length}</Typography>
                </div>}
            </div>
        </div>
    )
}

export default ApiCard;

function sum(numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0)
}