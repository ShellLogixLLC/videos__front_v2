import React from 'react';
import {GetServerSidePropsResult, NextPage} from 'next';

import {Seo, Typography} from '~/components';
import {MyFavorites} from '~/containers';
import ApiService from '~/api/ApiService';
import endpoints from '~/api/endpoints';
import {INITIAL_CATEGORY_LIMIT} from '~/constants';

const MyFavoritesPage: NextPage = () => (
  <Seo
    title="My favorites page"
    metaDescription="My favorites page description">
    {/*<Typography>WishList</Typography>*/}
    <MyFavorites />
  </Seo>
);

const OFFSET = 8;

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<{}>
> => {
  const resWishlist = await ApiService.get(
    endpoints.WishlistService.getWishlistVideos,
    {
      limit: INITIAL_CATEGORY_LIMIT,
    },
  );

  return {
    props: {
      fallback: {
        [endpoints.WishlistService.getWishlistVideos(LIMIT, OFFSET)]:
          resWishlist,
      },
    },
  };
};

export default MyFavoritesPage;
