import React from 'react';

import {VideosService} from '~/api';
import {Seo, Typography, Video} from '~/components';
import {POSTER_SRC, VIDEO_LENGTH, VIDEO_SRC} from '~/constants';

const TopRatedPage: React.FC = () => {
  const {isLoading} = VideosService.useVideos();

  return (
    <Seo title="Top rated page" metaDescription="Top rated page description">
      <Typography>topRated</Typography>
      <Video
        videoSrc={VIDEO_SRC}
        videoDuration={VIDEO_LENGTH}
        posterSrc={POSTER_SRC}
        loading={isLoading}
      />
    </Seo>
  );
};

export default TopRatedPage;
