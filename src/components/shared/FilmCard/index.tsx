import React, {useState} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';

import {createDate} from '~/utils';
import {VideosProps} from '~/types';
import {CategoryImage} from '~/assets';
import {COMMENTS_COUNT, VIEWS_COUNT} from '~/constants';
import {HeartLikes, FilmLikeIcon, ViewsCount, CommentsCount} from '~/assets';
import {getCookieFromBrowser} from '~/libraries';

import Button from '../Button';
import Image from '../Image';
import Typography from '../Typography';

import {FilmCardProps} from './types';
import styles from './FilmCard.module.scss';

const FilmCard: React.FC<FilmCardProps> = ({item, cardClasses = ''}) => {
  const {id, duration, title, description, createdAt, likesCount} =
    item as VideosProps;

  console.log(item, 'item');
  console.log(item.id, 'id');

  // const [isLiked, toggleIsLiked] = useToggle(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const createdDate = createDate(createdAt);
  const durationSec = (duration / 60).toFixed(2);

  const isLikedClasses = classNames(styles.wrapper__film_not_like_it, {
    [styles.wrapper__film_like_it]: isLiked,
  });

  const toggleIsLiked = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      const token = getCookieFromBrowser('token');
      const addResponse = await fetch(
        'https://obscure-harbor-76716.herokuapp.com/api/favorites',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({videoId: id}),
        },
      );
      return addResponse;
    } else {
      const token = getCookieFromBrowser('token');
      const deleteResponse = await fetch(
        'https://obscure-harbor-76716.herokuapp.com/api/favorites',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({videoId: id}),
        },
      );
      return deleteResponse;
    }
  };

  return (
    <>
      <div className={`${styles.wrapper} ${cardClasses}`}>
        <div className={styles.wrapper__film}>
          <Button className={isLikedClasses} onClick={toggleIsLiked}>
            <HeartLikes />
          </Button>
          <Image src={CategoryImage} alt={'Category Image'} />
          <Typography tagName="span" className={styles.wrapper__film__time}>
            {durationSec}
          </Typography>
        </div>
        <div className={styles.wrapper__other}>
          <h3 className={styles.wrapper__other_name}>{title?.en}</h3>
          <span className={styles.wrapper__other__dw_date}>{createdDate}</span>
        </div>
        <p className={styles.wrapper__pr_description}>{description?.en}</p>
        <div className={styles.wrapper__card_footer}>
          <div className={styles.wrapper__card_footer_item}>
            <p>{likesCount}</p>
            <FilmLikeIcon />
          </div>
          <div className={styles.wrapper__card_footer_item}>
            <p>{VIEWS_COUNT}</p>
            <ViewsCount />
          </div>
          <div className={styles.wrapper__card_footer_item}>
            <p>{COMMENTS_COUNT}</p>
            <CommentsCount />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmCard;
