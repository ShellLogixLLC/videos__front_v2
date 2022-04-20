import React from 'react';
import {SWRConfig} from 'swr';
import {GetServerSidePropsResult, NextPage} from 'next';

import {Seo} from '~/components';
import {Home} from '~/containers';
import endpoints from '~/api/endpoints';
import ApiService from '~/api/ApiService';
import {SwrPageProps} from '~/types';

const HomePage: NextPage<SwrPageProps> = ({fallback}) => (
  <Seo title="Home page" metaDescription="Home page description">
    <SWRConfig value={{fallback}}>
      <Home />
    </SWRConfig>
  </Seo>
);

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<{}>
> => {
  const resVideos = await ApiService.get(endpoints.VideosService.getVideos());

  const resCategories = await ApiService.get(
    endpoints.CategoryService.getCategories(),
  );

  return {
    props: {
      fallback: {
        [endpoints.CategoryService.getCategories()]: resCategories,
        [endpoints.VideosService.getVideos()]: resVideos,
      },
    },
  };
};

export default HomePage;
