import React from 'react';

import styles from './Video.module.scss';

const VideoSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <video className={styles.skeleton__video} />
    </div>
  );
};

export default VideoSkeleton;
