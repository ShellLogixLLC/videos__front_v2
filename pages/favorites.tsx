import React from 'react';
import {GetStaticProps, NextPage} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const FavoritesPage: NextPage = () => (
  <Seo title="Favorites page" metaDescription="Favorites page description">
    <h1>Favorites Page</h1>
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

export default FavoritesPage;
