import React from 'react';

import styles from './CommentsBlock.module.scss';

const CommentsBlockSkeleton: React.FC = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeleton__title} />
    <div className={styles.skeleton__arrow} />
  </div>
);

export default CommentsBlockSkeleton;
