import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps, NextPage} from 'next';

import {Seo, Comments} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <Comments />
  </Seo>
);

export const getStaticProps: GetStaticProps = async ({locale}: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
});

export default HomePage;
