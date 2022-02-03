import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps, NextPage} from 'next';

import {Seo} from '~/components';

import nextI18NextConfig from '../next-i18next.config.js';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <h1>New Page</h1>
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

export default NewPage;
