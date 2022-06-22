import React from 'react';
import {GetStaticProps, NextPage} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {Seo, Typography} from '~/components';

import nextI18NextConfig from '../next-i18next.config';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <Typography>New</Typography>
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

export default NewPage;
