import React, {useState} from 'react';
import classNames from 'classnames';

import {createDate} from '~/utils';
import {VideosProps} from '~/types';
import {useAppDispatch} from '~/hooks';
import {addToWishlist, deleteFromWishlist} from '~/store/wishlist/thunks';
import {
  HeartLikesIcon,
  FilmLikeIcon,
  ViewsCountIcon,
  CommentsCount,
  CategoryImage,
} from '~/assets';

import Link from '../Link';
import Image from '../Image';
import Button from '../Button';
import Typography from '../Typography';

import {FilmCardProps} from './types';
import styles from './FilmCard.module.scss';

const FilmCard: React.FC<FilmCardProps> = ({
  item,
  cardClasses = '',
  wishlist,
  isFavorite = false,
}) => {
  const {
    id,
    duration,
    title,
    description,
    createdAt,
    likesCount,
    views,
    commentsCount,
  } = item as VideosProps;

  const isVideoFavorite = isFavorite || wishlist?.includes(id) || false;

  const [isLiked, setIsLiked] = useState<boolean>(isVideoFavorite);

  const dispatch = useAppDispatch();

  const createdDate = createDate(createdAt);

  const durationSec = Math.round(duration % 60);

  const durationMinutes = Math.floor(duration / 60);

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
    <div className={`${styles.wrapper} ${cardClasses}`}>
      <Link to="video/[id]" as={`video/${id}`} className={styles.wrapper__film}>
        <Button className={isLikedClasses} onClick={toggleIsLiked}>
          <HeartLikesIcon />
        </Button>
        <Image src={CategoryImage} alt={'Category Image'} />
        <Typography tagName="span" className={styles.wrapper__film__time}>
          {durationMinutes} : {durationSec}
        </Typography>
      </Link>
      <div className={styles.wrapper__other}>
        <Link
          to="video/[id]"
          as={`video/${id}`}
          className={styles.wrapper__other_name}>
          {title?.en}
        </Link>
        <span className={styles.wrapper__other__dw_date}>{createdDate}</span>
      </div>
      <p className={styles.wrapper__pr_description}>{description?.en}</p>
      <div className={styles.wrapper__card_footer}>
        <div className={styles.wrapper__card_footer_item}>
          <p>{likesCount}</p>
          <FilmLikeIcon />
        </div>
        <div className={styles.wrapper__card_footer_item}>
          <p>{views}</p>
          <ViewsCountIcon />
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
