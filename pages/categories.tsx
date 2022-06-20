import React from 'react';
import {GetStaticProps, NextPage} from 'next';
// import { useTranslation } from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {Seo, Typography} from '~/components';

import nextI18NextConfig from '../next-i18next.config';

const CategoriesPage: NextPage = () => (
  <Seo title="Categories page" metaDescription="Categories page description">
    <Typography>Categories</Typography>
  </Seo>
);

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale as string,
        ['common'],
        nextI18NextConfig,
      )),
    },
  };
};

export default CategoriesPage;
