import React from 'react';
import {SWRConfig} from 'swr';
import {NextPage, GetServerSidePropsResult, GetServerSideProps} from 'next';

import {Seo} from '~/components';
import endpoints from '~/api/endpoints';
import {Wishlist} from '~/containers';
import ApiService from '~/api/ApiService';
import {getCookie} from '~/libraries';
import {ICategoriesPageQueries, SwrPageProps} from '~/types';
import {
  LocaleKeys,
  INITIAL_WISHLIST_LIMIT,
  getProtectedPageRedirect,
} from '~/constants';

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
  const {locale, req, query} = ctx;
  const {page} = query as ICategoriesPageQueries;

  const token = getCookie('token', req.headers.cookie as string);

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

  return !token
    ? getProtectedPageRedirect(locale as LocaleKeys)
    : {
        props: {
          fallback: {
            [endpoints.WishlistService.getWishlistVideos()]: wishlistVideos,
          },
        },
      };
};

export default MyFavoritesPage;
