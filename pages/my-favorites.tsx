import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';
import {SWRConfig} from 'swr';
import axios from 'axios';
import Cookies from 'cookie';

import {Seo} from '~/components';
import {Wishlist} from '~/containers';
import ApiService from '~/api/ApiService';
import endpoints from '~/api/endpoints';
import {INITIAL_WISHLIST_LIMIT} from '~/constants';
import {ICategoriesPageQueries, SwrPageProps} from '~/types';

const MyFavoritesPage: NextPage<SwrPageProps> = ({fallback}) => (
  <SWRConfig value={fallback}>
    <Seo
      title="My favorites page"
      metaDescription="My favorites page description">
      <Wishlist />
    </Seo>
  </SWRConfig>
);

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<{}>> => {
  const {page} = ctx.query as ICategoriesPageQueries;
  const activePage = page ? Number(page) : 0;

  const cookie = ctx.req.headers.cookie
    ?.split(';')
    .find((cookie) => cookie.includes('token'))
    ?.replace('token=', '');
  const headers = {Authorization: `Bearer ${cookie}`};

  const wishlistVideos = await ApiService.get(
    endpoints.WishlistService.getWishlistVideos(),
    {
      limit: INITIAL_WISHLIST_LIMIT,
      offset: activePage * INITIAL_WISHLIST_LIMIT,
    },
    {headers},
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
