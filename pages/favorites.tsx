import React from 'react';

import {Seo, Typography} from '~/components';

import {getStaticProps} from './index';

// const VIDEO_LENGTH = 110.5;
// const VIDEO_SRC =
//   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
// const POSTER_SRC =
//   'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217';

const FavoritesPage: React.FC = () => (
  <Seo title="Favorites page" metaDescription="Favorites page description">
    <Typography>Top Rated</Typography>
  </Seo>
);

export {getStaticProps};

export default FavoritesPage;
