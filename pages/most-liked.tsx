import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps, NextPage} from 'next';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const MostLikedPage: NextPage = () => (
  <Seo title="Most liked page" metaDescription="Most liked page description">
    <h1>Most Liked Page</h1>
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

export default MostLikedPage;
