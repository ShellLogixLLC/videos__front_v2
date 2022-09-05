import React from 'react';

import {VideosService} from '~/api';
import {getCookieFromBrowser} from '~/libraries';
import {
  Video,
  VideoSkeleton,
  VideoDescription,
  VideDescriptionSkeleton,
} from '~/components';

import styles from '../Video.module.scss';

const VideoWrapper: React.FC = () => {
  const lng = (getCookieFromBrowser('activeLang') as string) || 'en';

  const {data, isLoading} = VideosService.useVideoById();

  if (isLoading) {
    return (
      <>
        <VideoSkeleton />
        <VideDescriptionSkeleton />
      </>
    );
  }

  const {
    title,
    views,
    filePath,
    duration,
    createdAt,
    likesCount,
    description,
    thumbnailPath,
  } = data;

  return (
    <>
      <div className={styles.content__video}>
        <Video
          videoSrc={
            'http://localhost:5000/api/videos/6312555c2db88a1a69a98e28/file'
          }
          posterSrc={thumbnailPath}
          videoDuration={duration}
        />
        <VideoDescription
          videoName={title[lng]}
          likeCount={likesCount}
          viewCount={views}
          createdAt={createdAt}
          description={description[lng]}
        />
      </div>
    </>
  );
};

export default VideoWrapper;
