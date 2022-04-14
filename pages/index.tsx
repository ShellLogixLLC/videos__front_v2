import React from 'react';
import {SWRConfig} from 'swr';
import {GetServerSidePropsResult, NextPage} from 'next';

import {Seo} from '~/components';
import {Home} from '~/containers';

import ApiService from '~/api/ApiService';
import endpoints from '~/api/endpoints';

const HomePage: NextPage = ({fallback}: any) => (
  <Seo title="Home page" metaDescription="Home page description">
    <SWRConfig value={{fallback}}>
      <Home />
    </SWRConfig>
  </Seo>
);

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<{}>
> => {
  const res = await ApiService.get(endpoints.AuthService.getCategories());

  return {
    props: {
      fallback: {
        [endpoints.AuthService.getCategories()]: res,
      },
    },
  };
};

export default HomePage;
