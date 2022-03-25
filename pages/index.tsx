import React from 'react';
import {NextPage} from 'next';
import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {Seo, Loader, DatePicker} from '~/components';

import nextI18NextConfig from '../next-i18next.config';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <Loader />
    <DatePicker />
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

export default HomePage;
