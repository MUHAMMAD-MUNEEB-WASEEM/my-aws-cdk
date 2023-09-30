import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { navigate } from 'gatsby-link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      overflow: "hidden",
      maxHeight:'100%',
      marginBottom: 40,      
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blue[800],
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

export default function TrainingProgramCard({title, imageUrl, status, preReq, outline, slug}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [titleText, subheader] = title.split(":")
  const avatarYear = titleText.substring(titleText.length - 4)

  const output = outline
  .sort((a, b) => (a.segmentNumber > b.segmentNumber ? 1 : b.segmentNumber > a.segmentNumber ? -1 : 0))
  .map(v => v.title)

  return (      
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="bootcamp" className={classes.avatar}>
            {avatarYear}
          </Avatar>
        }        
        title={titleText}
        //subheader={subheader}
      />
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="bootcamp programs"
      />
      <CardContent>
      <Typography gutterBottom variant="h6" component="h2">
        {subheader}
          </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         Status: {status}
        </Typography>
        <br/> 
        <Typography variant="body2" color="textSecondary" component="p">
         Pre Requisite: {preReq} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>         
        <Button size="small" color="primary" variant="contained" onClick={()=>{navigate(slug)}}>
          Learn More
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {output
          .map((out,i) => (
            <Typography key={i}>{out}</Typography>
          )
        )}
        </CardContent>
      </Collapse>
    </Card>
  );
}