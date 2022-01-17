import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps, NextPage} from 'next';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const CategoriesPage: NextPage = () => (
  <Seo
    title="Categories page"
    metaDescription="Categories page description"></Seo>
);

type GetStaticPropsArgs = {
  locale?: string;
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsArgs) => ({
  props: {
    ...(await serverSideTranslations(
      locale as string,
      ['common'],
      nextI18NextConfig,
    )),
  },
});
export default CategoriesPage;
