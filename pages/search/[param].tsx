import React from 'react';
import {SWRConfig} from 'swr';
import {GetServerSidePropsResult, NextPage} from 'next';

import {Seo} from '~/components';
import {Search} from '~/containers';
import endpoints from '~/api/endpoints';
import ApiService from '~/api/ApiService';
import {SwrPageProps} from '~/types';

const SearchPage: NextPage<SwrPageProps> = ({fallback}) => (
  <Seo title="Search page" metaDescription="Search page description">
    <SWRConfig value={{fallback}}>
      <Search />
    </SWRConfig>
  </Seo>
);

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<{}>
> => {
  const resVideos = await ApiService.get(endpoints.VideosService.getVideos());

  return {
    props: {
      fallback: {
        [endpoints.VideosService.getVideos()]: resVideos,
      },
    },
  };
};

export default SearchPage;
