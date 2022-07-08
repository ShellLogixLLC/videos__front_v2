import React from 'react';

import {VideosService} from '~/api';
import {
  Video,
  VideoSkeleton,
  VideoDescription,
  VideDescriptionSkeleton,
} from '~/components';

import styles from '../Video.module.scss';

const VideoWrapper: React.FC = () => {
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
          videoSrc={filePath}
          posterSrc={thumbnailPath}
          videoDuration={duration}
        />
        <VideoDescription
          videoName={title.en}
          likeCount={likesCount}
          viewCount={views}
          createdAt={createdAt}
          description={description.en}
        />
      </div>
    </>
  );
};

export default VideoWrapper;
