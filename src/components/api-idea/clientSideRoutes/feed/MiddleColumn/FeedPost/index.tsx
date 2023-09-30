import React, { useMemo } from 'react';
import { Tooltip, Typography } from '@material-ui/core';

import kFormatter from '../../utils/kFormatter';

import Panel from '../../Panel';

import { useStyles } from '../../styles/MaterialUI';
import useStyles1 from '../../../../ApiCard/style';
import { Container, Row, PostImage, Separator, Avatar, Column, LikeIcon, CommentIcon, ShareIcon, SendIcon, PostOptionsIcon } from './styles';

interface PostProps {
  user: string;
  title: string;
  avatar: string;
}

const FeedPost: React.FC<PostProps> = ({ user, title, avatar }) => {
  const classes = useStyles();
  const classes1 = useStyles1();//through style.ts in ApiCard

  const reactions = useMemo(() => ['congrats', 'idea', 'like', 'love', 'support', 'think'], []);
  const slicedReactions = useMemo(() => reactions.sort(() => 0.5 - Math.random()).slice(0, 3), []);
  const comments = useMemo(() => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1), []);
  const likes = useMemo(() => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1), []);
  const time = useMemo(() => Math.floor(Math.random() * (24 - 1)) + 1, []);

  return (
    <Panel>
      <div className={classes1.clientPost}>
      <Container>
        <Row className="heading">
         
            <Avatar src={avatar} alt="Rocketseat" />
            <Column>
              <h3>{user}</h3>
              <h4>{title}</h4>
              <Tooltip title={`${user} posted ${time}h ago`} placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
                <time>{`${time}h`}</time>
              </Tooltip>
            </Column>
            <div className="post-options">
              <PostOptionsIcon />
            </div>
        </Row>

        {/*image and text*/}
        <div className={classes1.textImage}>
          <PostImage 
          src="https://blog.rocketseat.com.br/content/images/2019/05/Painel.png" alt="Rocketseat Blog" />
          <Typography>Honored to be nominated as one of the the new Fellow for CBA</Typography>
        </div>
        
        
        <Row className="likes">
          {slicedReactions.map(reaction => (
            <span className={`circle ${reaction}`} key={reaction} />
          ))}
          <Tooltip title={`${likes} users reacted to this post`} placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
            <span className="number">{likes}</span>
          </Tooltip>
          <span className="number">•</span>
          <Tooltip title={`${comments} users commented on this post`} placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
            <span className="number">{`${comments} Comments`}</span>
          </Tooltip>
        </Row>

        <Row>
          <Separator />
        </Row>
{/* 
        <Row className="actions">
          <Tooltip title="React to the post" placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
            <button type="button">
              <LikeIcon />
              <span>Like</span>
            </button>
          </Tooltip>
          <Tooltip title="Comment on the post" placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
            <button type="button">
              <CommentIcon />
              <span>Comment</span>
            </button>
          </Tooltip>
          <Tooltip title="Share post" placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
            <button type="button">
              <ShareIcon />
              <span>Share</span>
            </button>
          </Tooltip>
          <Tooltip title="Send post" placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
            <button type="button">
              <SendIcon />
              <span>Send</span>
            </button>
          </Tooltip>
        </Row> */}
      </Container>
      </div>
    </Panel>
  );
};

export default FeedPost;
