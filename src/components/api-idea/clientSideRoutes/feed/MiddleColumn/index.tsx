import React from 'react';


import LoadingFeedShare from '../Shimmer/LoadingFeedShare';
import LoadingFeedPost from '../Shimmer/LoadingFeedPost';
import FeedShare from './FeedShare';
import FeedPost from './FeedPost';

// import twitter from '../images/img/twitter.png'
// import facebook from '../images/img/facebook.png'
// import rocketseat from '../images/img/rocketseat.png'
import { Container, DownIcon } from './styles';

interface LoadingProps {
  isLoading: boolean;
}

const MiddleColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Container className="middle-column">
      {isLoading ? (
        <>
          <LoadingFeedShare />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
        </>
      ) : (
        <>
          <FeedShare avatar="https://media-exp1.licdn.com/dms/image/C5103AQGhUxpE4MrBMA/profile-displayphoto-shrink_800_800/0/1566197788509?e=1624492800&v=beta&t=cRMuQ5VrEeBv-LAxH4GnYJqvNJKWFrn1jwlq6TbJ498"/>
          {/* <div className="seprator">
            <div className="line" />
            <span>
              Sort by:
              <strong> Top</strong>
            </span>
            <DownIcon />
          </div> */}
          <FeedPost avatar="https://github.com/leoronne.png" user="Leonardo Ronne" title="Front-end Developer at Memed" />
          {/* <FeedPost avatar={rocketseat} user="Rocketseat" title="Educational institution" />
          <FeedPost avatar={facebook} user="Facebook" title="Company" />
          <FeedPost avatar={twitter} user="Twitter" title="Company" /> */}
        </>
      )}
    </Container>
  );
};

export default MiddleColumn;
