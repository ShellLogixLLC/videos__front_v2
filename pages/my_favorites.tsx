import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';
import {MyFavorites} from '~/containers';

import {getStaticProps} from './categories';

const MyFavoritesPage: NextPage = () => (
  <Seo
    title="My favorites page"
    metaDescription="My favorites page description">
    {/*<Typography>WishList</Typography>*/}
    <MyFavorites />
  </Seo>
);

export {getStaticProps};

export default MyFavoritesPage;
