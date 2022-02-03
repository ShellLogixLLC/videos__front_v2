import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps, NextPage} from 'next';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const MyFavoritesPage: NextPage = () => (
  <Seo
    title="My favorites page"
    metaDescription="My favorites page description">
    <h1>My Favorites Page</h1>
  </Seo>
);

export const getStaticProps: GetStaticProps = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(
      locale as string,
      ['common'],
      nextI18NextConfig,
    )),
  },
});

export default MyFavoritesPage;
