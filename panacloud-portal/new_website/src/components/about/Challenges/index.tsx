import { Grid, Typography } from '@material-ui/core'
import React, { FC, useEffect } from 'react'
import CardFeatures from '../../home/Cards'
import AOS from 'aos'

export type Props = {
    mainPoints: string[]
}

export const Challenges: FC<Props> = ({ mainPoints }) => {
    useEffect(() => {
        AOS.init({ duration: 400 });
      }, [])
    return (
        <div style={{ margin: "15px 0" }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: "center", fontWeight: "bold" }} data-aos="fade">
                Challenges We Face
            </Typography>
            <Grid
                style={{ marginTop: 0 }}
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                data-testid="card"
            >
                {mainPoints &&
                    mainPoints.map((v, i) => (
                        i === mainPoints.length - 1? (
                            <Grid key={i}>
                            <CardFeatures
                                display="wider"
                                title={`Challenge #${i+1}`}
                                icon="//images.ctfassets.net/v4bcke0h1y2s/1DSmnv8vdX5uBqyYAUMaOt/e9fb28dd4316e9dbbbe3916a07aff5df/network.png"
                                description={v}
                            />
                        </Grid>
                        ) : (
                            <Grid key={i} data-aos="fade-up">
                            <CardFeatures
                                display="wider"
                                title={`Challenge #${i+1}`}
                                icon="//images.ctfassets.net/v4bcke0h1y2s/1DSmnv8vdX5uBqyYAUMaOt/e9fb28dd4316e9dbbbe3916a07aff5df/network.png"
                                description={v}
                            />
                        </Grid>
                        )
                    ))}
            </Grid>
        </div>
    )
}
