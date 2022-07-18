import React from 'react';
import {SWRConfig} from 'swr';
import {NextPage, GetServerSideProps, GetServerSidePropsResult} from 'next';

import {Seo} from '~/components';
import endpoints from '~/api/endpoints';
import {Wishlist} from '~/containers';
import ApiService from '~/api/ApiService';
import {getCookie} from '~/libraries';
import {pageRedirect} from '~/utils';
import {INITIAL_WISHLIST_LIMIT} from '~/constants';
import {ICategoriesPageQueries, SwrPageProps} from '~/types';

const MyFavoritesPage: NextPage<SwrPageProps> = ({fallback}) => (
  <SWRConfig value={fallback}>
    <Seo
      title="My favorites page"
      className="favorites-page"
      metaDescription="My favorites page description">
      <Wishlist />
    </Seo>
  </SWRConfig>
);

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<{}>> => {
  const {page} = ctx.query as ICategoriesPageQueries;

  const token = getCookie('token', ctx.req.headers.cookie as string);

  pageRedirect(!token, ctx);

  const activePage = page ? Number(page) : 0;

  const headers = {Authorization: `Bearer ${token}`};

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
