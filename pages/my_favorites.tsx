import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';
import {SWRConfig} from 'swr';

import {Seo} from '~/components';
import {MyFavorites} from '~/containers';
import ApiService from '~/api/ApiService';
import endpoints from '~/api/endpoints';
import {INITIAL_WISHLIST_LIMIT} from '~/constants';
import {ICategoriesPageQueries, SwrPageProps} from '~/types';

const MyFavoritesPage: NextPage<SwrPageProps> = ({fallback}) => (
  <SWRConfig value={fallback}>
    <Seo
      title="My favorites page"
      metaDescription="My favorites page description">
      <MyFavorites />
    </Seo>
  </SWRConfig>
);

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<GetServerSidePropsResult<{}>> => {
  const {page} = query as ICategoriesPageQueries;
  const activePage = page ? Number(page) : 0;

  const wishlistVideos = await ApiService.get(
    endpoints.WishlistService.getWishlistVideos(),
    {
      limit: INITIAL_WISHLIST_LIMIT,
      offset: activePage * INITIAL_WISHLIST_LIMIT,
    },
  );

  return {
    props: {
      fallback: {
        [endpoints.WishlistService.getWishlistVideos()]: wishlistVideos,
      },
    },
  };
};

export default MyFavoritesPage;
