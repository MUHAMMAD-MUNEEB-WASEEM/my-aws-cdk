import React, { FC, CSSProperties, HtmlHTMLAttributes } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export interface Props {
    url: string,
    height?: CSSProperties['height'],
    width?: CSSProperties['width'],
    position?: CSSProperties['backgroundPosition']
}

const useStyles = makeStyles<Theme, Props, 'image'>(theme => ({
    image: ({ height, width, position, url }) => ({
        background: `url(${url})`,
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width,
        padding: `calc(${height} / 2)`,
    })
}))


const Image: FC<Props & HtmlHTMLAttributes<HTMLDivElement>> = ({
    height = '22%',
    width = '100%',
    position = "center",
    url,
    ...others
}) => {
    const classes = useStyles({ height, width, position, url })
    return (
        <div className={classes.image} {...others} />
    )
}

export default Image;


