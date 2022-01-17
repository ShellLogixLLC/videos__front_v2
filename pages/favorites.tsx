import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps, NextPage} from 'next';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const FavoritesPage: NextPage = () => (
  <Seo
    title="Favorites page"
    metaDescription="Favorites page description"></Seo>
);

export const getStaticProps: GetStaticProps = async ({locale}: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
});

export default FavoritesPage;
