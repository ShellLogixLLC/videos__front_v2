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

  console.log(likesCount, 'like');

  return (
    <>
      <div className={styles.content__video}>
        <Video
          videoSrc={filePath}
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
