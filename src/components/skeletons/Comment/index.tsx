import React from 'react';

import {ISkeletonComment} from '../types';

import styles from './Comment.module.scss';

const CommentSkeleton: React.FC<ISkeletonComment> = ({dataLength = 6}) => {
  const commentsArray = new Array(dataLength).fill({});

  const renderCommentsSkeleton = commentsArray.map((_el, index) => (
    <div key={index} className={styles.skeleton__comment}>
      <div className={styles.skeleton__comment__head}>
        <div className={styles.skeleton__comment__head__image} />
        <div className={styles.skeleton__comment__head__name} />
      </div>
      <div className={styles.skeleton__comment__body}>
        <div className={styles.skeleton__comment__body__description} />
      </div>
    </div>
  ));

  return <>{renderCommentsSkeleton}</>;
};

export default CommentSkeleton;
