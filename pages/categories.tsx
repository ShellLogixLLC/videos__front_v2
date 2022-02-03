import React from 'react';
import {GetStaticProps, NextPage} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const CategoriesPage: NextPage = () => (
  <Seo title="Categories page" metaDescription="Categories page description">
    <h1>Categories Page</h1>
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
export default CategoriesPage;
