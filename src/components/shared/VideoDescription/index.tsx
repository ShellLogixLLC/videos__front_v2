import React, {useState} from 'react';
import classNames from 'classnames';

import {HeartLikes, FilmLikeIcon, ViewsCount} from '~/assets/index';

import {VideDescriptionTypes} from './types';
//
import styles from './VideDescription.module.scss';

const videDescriptionTextDefault = 'Have problems with the internet !';

const VideDescription: React.FC<VideDescriptionTypes> = ({
  videoName,
  likeCount = 7777,
  viewCount = 7777,
  dateOfDownload = '20/07/21',
  videDescriptionText = videDescriptionTextDefault,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const likeHandler = () => {
    setIsLiked(!isLiked);
  };

  const isLikedClasses = classNames(styles.wrapper__title_block__heart_like, {
    [styles.wrapper__title_block__heart_dislike]: !isLiked,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__title_block}>
        <h3 className={styles.wrapper__title_block__name}>
          {videoName}Video Name
        </h3>
        <HeartLikes onClick={likeHandler} className={isLikedClasses} />
      </div>
      <span className={styles.wrapper__date}>{dateOfDownload}</span>
      <p className={styles.wrapper__description}>{videDescriptionText}</p>
      <div className={styles.wrapper__views_liked}>
        <span className={styles.wrapper__views_liked__like}>
          {likeCount} <FilmLikeIcon />
        </span>
        <span className={styles.wrapper__views_liked__view}>
          {viewCount} <ViewsCount />
        </span>
      </div>
    </div>
  );
};

export default VideDescription;
