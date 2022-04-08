import React from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';

import {HeartLikes, FilmLikeIcon, ViewsCount, CommentsCount} from '~/assets';

import Button from '../Button';
import Typography from '../Typography';

import {FilmCardProps} from './types';
import styles from './FilmCard.module.scss';

const FilmCard: React.FC<FilmCardProps> = ({
  filmName = 'Video0000000000',
  uploadDate = '20/07/21',
  globalTime = '23:00',
  likeCount = 34,
  viewsCount = 33,
  descriptionText = 'InformationInformationInformationInformationInformation',
  cardClasses = '',
  commentsCount = 12,
}) => {
  const [isLiked, toggleIsLiked] = useToggle(false);

  const isLikedClasses = classNames(styles.wrapper__film_not_like_it, {
    [styles.wrapper__film_like_it]: isLiked,
  });

  return (
    <div className={`${styles.wrapper} ${cardClasses}`}>
      <div className={styles.wrapper__film}>
        <Button className={isLikedClasses} onClick={toggleIsLiked}>
          <HeartLikes />
        </Button>
        <Typography tagName="span" className={styles.wrapper__film__time}>
          {globalTime}
        </Typography>
      </div>
      <div className={styles.wrapper__other}>
        <h3 className={styles.wrapper__other_name}>{filmName}</h3>
        <span className={styles.wrapper__other__dw_date}>{uploadDate}</span>
      </div>
      <p className={styles.wrapper__pr_description}>{descriptionText}</p>
      <div className={styles.wrapper__card_footer}>
        <div className={styles.wrapper__card_footer_item}>
          <p>{likeCount}</p>
          <FilmLikeIcon />
        </div>
        <div className={styles.wrapper__card_footer_item}>
          <p>{viewsCount}</p>
          <ViewsCount />
        </div>
        <div className={styles.wrapper__card_footer_item}>
          <p>{commentsCount}</p>
          <CommentsCount />
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
