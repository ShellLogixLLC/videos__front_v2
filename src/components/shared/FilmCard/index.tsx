import React, {useState} from 'react';
import classNames from 'classnames';

import {createDate} from '~/utils';
import {VideosProps} from '~/types';
import {useAppDispatch} from '~/hooks';
import {COMMENTS_COUNT, VIEWS_COUNT} from '~/constants';
import {addToWishlist, deleteFromWishlist} from '~/store/wishlist/thunks';
import {
  HeartLikes,
  FilmLikeIcon,
  ViewsCount,
  CommentsCount,
  CategoryImage,
} from '~/assets';

import Typography from '../Typography';
import Button from '../Button';
import Image from '../Image';

import {FilmCardProps} from './types';
import styles from './FilmCard.module.scss';

const FilmCard: React.FC<FilmCardProps> = ({
  item,
  cardClasses = '',
  wishlist,
  isFavorite = false,
}) => {
  const {id, duration, title, description, createdAt, likesCount} =
    item as VideosProps;

  const isVideoFavorite = isFavorite || wishlist?.includes(id) || false;

  const [isLiked, setIsLiked] = useState<boolean>(isVideoFavorite);

  const dispatch = useAppDispatch();

  const createdDate = createDate(createdAt);

  const durationSec = (duration / 60).toFixed(2);

  const isLikedClasses = classNames(styles.wrapper__film_not_like_it, {
    [styles.wrapper__film_like_it]: isLiked,
  });

  const toggleIsLiked = async () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      dispatch(addToWishlist({videoId: id}));
    } else {
      dispatch(deleteFromWishlist({videoId: id}));
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
