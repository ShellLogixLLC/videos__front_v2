import React from 'react';
import {NextPage} from 'next';

import {Seo, Video} from '~/components';

import {getStaticProps} from './_app';

const VIDEO_LENGTH = 15.5;
const VIDEO_SRC =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const FavoritesPage: NextPage = () => (
  <Seo title="Favorites page" metaDescription="Favorites page description">
    <br />
    <br />
    <br />
    <br />
    <Video videoDuration={VIDEO_LENGTH} videoSrc={VIDEO_SRC} />
  </Seo>
);

export {getStaticProps};

export default FavoritesPage;
