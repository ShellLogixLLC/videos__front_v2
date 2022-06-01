import React from 'react';
import {GetServerSidePropsResult, NextPage} from 'next';
import {SWRConfig} from 'swr';

import {Seo} from '~/components';
import {MyFavorites} from '~/containers';
import ApiService from '~/api/ApiService';
import endpoints from '~/api/endpoints';
import {
  INITIAL_CATEGORY_LIMIT,
  INITIAL_WISHLIST_LIMIT,
  INITIAL_WISHLIST_OFFSET,
} from '~/constants';

const MyFavoritesPage: NextPage = ({fallback}) => (
  <SWRConfig value={fallback}>
    <Seo
      title="My favorites page"
      metaDescription="My favorites page description">
      <MyFavorites />
    </Seo>
  </SWRConfig>
);

export const getServerSideProps = async ({}): Promise<
  GetServerSidePropsResult<{}>
> => {
  const wishlistVideos = await ApiService.get(
    endpoints.CategoryService.getVideoByCategoryId(),
    {
      offset: INITIAL_WISHLIST_OFFSET,
      limit: INITIAL_CATEGORY_LIMIT,
    },
  );

  console.log(wishlistVideos, 'aaa');

  return {
    props: {
      fallback: {
        [endpoints.WishlistService.getWishlistVideos(
          INITIAL_WISHLIST_LIMIT,
          INITIAL_WISHLIST_OFFSET,
        )]: wishlistVideos,
      },
    },
  };
};

export default MyFavoritesPage;
