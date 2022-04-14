import React from 'react';

import {Seo, Typography, Video} from '~/components';

import {getStaticProps} from './categories';

const VIDEO_LENGTH = 110.5;
const VIDEO_SRC =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const POSTER_SRC =
  'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217';

const FavoritesPage: React.FC = () => (
  <Seo title="Favorites page" metaDescription="Favorites page description">
    <Typography>Top Rated</Typography>
    <Video
      videoSrc={VIDEO_SRC}
      videoDuration={VIDEO_LENGTH}
      posterSrc={POSTER_SRC}
    />
  </Seo>
);

export {getStaticProps};

export default FavoritesPage;
