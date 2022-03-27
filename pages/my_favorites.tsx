import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

import {getStaticProps} from './index';

const MyFavoritesPage: NextPage = () => (
  <Seo
    title="My favorites page"
    metaDescription="My favorites page description">
    <Typography>Favorites</Typography>
  </Seo>
);

export {getStaticProps};

export default MyFavoritesPage;
