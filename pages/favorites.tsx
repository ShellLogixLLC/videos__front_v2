import React from 'react';

import {VideosService} from '~/api';
import {Seo, Typography, Video} from '~/components';

const VIDEO_LENGTH = 110.5;
const VIDEO_SRC =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const POSTER_SRC =
  'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217';

const FavoritesPage: React.FC = () => {
  const {isLoading} = VideosService.useVideos();

  return (
    <Seo title="Favorites page" metaDescription="Favorites page description">
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

export default FavoritesPage;
