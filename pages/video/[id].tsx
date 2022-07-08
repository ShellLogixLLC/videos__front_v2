import React from 'react';
import {SWRConfig} from 'swr';
import {GetServerSideProps, NextPage} from 'next';

import {Seo} from '~/components';
import {SwrPageProps} from '~/types';
import {VideoContainer} from '~/containers';
import endpoints from '~/api/endpoints';
import ApiService from '~/api/ApiService';
import {
  COMMENTS_LIMIT,
  VIDEO_INITIAL_LIMIT,
  VIDEO_INITIAL_OFFSET,
} from '~/constants';

const VideoPage: NextPage<SwrPageProps> = ({fallback}) => {
  return (
    <Seo title="Video page" metaDescription="Video page description">
      <SWRConfig value={{fallback}}>
        <VideoContainer />
      </SWRConfig>
    </Seo>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  const activeVideoId = params?.id;

  const video = await ApiService.get(
    endpoints.VideosService.getVideoById(activeVideoId),
  );

  const comments = await ApiService.get(
    endpoints.VideosService.getVideoComments(
      VIDEO_INITIAL_OFFSET,
      COMMENTS_LIMIT,
      activeVideoId,
    ),
  );

  const videosSimilar = await ApiService.get(
    endpoints.VideosService.getVideoSimilar(
      VIDEO_INITIAL_OFFSET,
      VIDEO_INITIAL_LIMIT,
      activeVideoId,
    ),
  );

  return {
    props: {
      fallback: {
        [endpoints.VideosService.getVideoById(activeVideoId)]: video,
        [endpoints.VideosService.getVideoComments(
          VIDEO_INITIAL_OFFSET,
          COMMENTS_LIMIT,
          activeVideoId,
        )]: comments,
        [endpoints.VideosService.getVideoSimilar(
          VIDEO_INITIAL_OFFSET,
          VIDEO_INITIAL_LIMIT,
          activeVideoId,
        )]: videosSimilar,
      },
    },
  };
};

export default VideoPage;
