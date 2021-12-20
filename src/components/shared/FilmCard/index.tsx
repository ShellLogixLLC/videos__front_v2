import React from 'react';

import {LikeIt, FilmLikeIcon, ViewsCount, CommentsCount} from '~/assets';
import {Typography} from '~/components';

import {FilmCardTypes} from './types';
import styles from './FilmCard.module.scss';

const FilmCard: React.FC<FilmCardTypes> = ({
  filmName,
  likeCount = 0,
  viewsCount = 0,
  uploadDate,
  commentsCount = 0,
  descriptionText,
  globalTime,
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__film}>
        <LikeIt className={styles.wrapper__film_like_it} />
        <Typography tagName="span" className={styles.wrapper__film__time}>
          {globalTime}
        </Typography>
        {/* VIDEO */}
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
    </section>
  );
};

export default FilmCard;
