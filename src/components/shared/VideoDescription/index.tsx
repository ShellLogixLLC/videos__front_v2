import React, {useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';

import {HeartLikesIcon, FilmLikeIcon, ViewsCountIcon} from '~/assets/index';
import {
  VIDEO_CREATED_AT,
  VIDEO_INITIAL_NAME,
  VIDEO_INITIAL_LIKE_COUNT,
  VIDEO_INITIAL_VIEW_COUNT,
} from '~/constants';

import {VideDescriptionTypes} from './types';
import styles from './VideDescription.module.scss';

const videDescriptionTextDefault = 'Have problems with the internet !';

const VideDescription: React.FC<VideDescriptionTypes> = ({
  createdAt = VIDEO_CREATED_AT,
  videoName = VIDEO_INITIAL_NAME,
  likeCount = VIDEO_INITIAL_LIKE_COUNT,
  viewCount = VIDEO_INITIAL_VIEW_COUNT,
  description = videDescriptionTextDefault,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const formatCreatedDate = moment(createdAt).format('L');

  const likeHandler = () => {
    setIsLiked(!isLiked);
  };

  const isLikedClasses = classNames(styles.wrapper__title_block__heart_like, {
    [styles.wrapper__title_block__heart_dislike]: !isLiked,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__options}>
        <div className={styles.wrapper__views_liked}>
          <span className={styles.wrapper__views_liked__like}>
            {likeCount} <FilmLikeIcon />
          </span>
          <span className={styles.wrapper__views_liked__view}>
            {viewCount} <ViewsCountIcon />
          </span>
        </div>
        <HeartLikesIcon onClick={likeHandler} className={isLikedClasses} />
      </div>
      <h3 className={styles.wrapper__title_block__name}>{videoName}</h3>
      <p className={styles.wrapper__date}>{formatCreatedDate}</p>
      <p className={styles.wrapper__description}>{description}</p>
    </div>
  );
};

export default VideDescription;
