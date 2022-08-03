import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import {createDate} from '~/utils';
import {VideosProps, WishlistActions} from '~/types';
import {WishlistModal} from '~/components';
import {useAppDispatch} from '~/hooks';
import {getCookieFromBrowser} from '~/libraries';
import {addToWishlist, deleteFromWishlist} from '~/store/wishlist/thunks';
import {
  CategoryImage,
  CommentsCount,
  FilmLikeIcon,
  HeartLikesIcon,
  ViewsCountIcon,
} from '~/assets';
import warnToast from '~/utils/warnToast';
import {wishlistActions} from '~/store/wishlist';

import Link from '../Link';
import Image from '../Image';
import Button from '../Button';
import Typography from '../Typography';

import {FilmCardProps} from './types';
import styles from './FilmCard.module.scss';

const FilmCard: React.FC<FilmCardProps> = ({
  item,
  wishlist,
  isFavorite = false,
  cardClasses = '',
  isWishlistPage,
  refreshVideos,
}) => {
  const lng = getCookieFromBrowser('activeLang') || 'en';
  const token = getCookieFromBrowser('token');

  const {
    id,
    title,
    views,
    duration,
    createdAt,
    likesCount,
    description,
    commentsCount,
  } = item as VideosProps;

  const isVideoFavorite = isFavorite || wishlist?.includes(id) || false;

  const [isLiked, setIsLiked] = useState<boolean>(isVideoFavorite);
  const [isLikeItPopup, setIsLikeItPopup] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(isVideoFavorite);
  }, [isVideoFavorite]);

  const dispatch = useAppDispatch();

  const createdDate = createDate(createdAt);

  const durationSec = Math.round(duration % 60);

  const durationMinutes = Math.floor(duration / 60);

  const isLikedClasses = classNames(styles.wrapper__film_notLiked, {
    [styles.wrapper__film_liked]: isLiked,
  });

  const handleUndoDelete = (): void => {
    dispatch(addToWishlist({videoId: id}));
    if (isWishlistPage && refreshVideos) {
      refreshVideos(WishlistActions.ADD, item);
    }
    dispatch(wishlistActions.getWishlistIds());
  };

  const toggleIsLiked = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);

    if (!isLiked) {
      await dispatch(addToWishlist({videoId: id}));
    } else {
      if (isWishlistPage && refreshVideos) {
        warnToast(id, handleUndoDelete);
        refreshVideos(WishlistActions.DELETE, item);
      }
      await dispatch(deleteFromWishlist({videoId: id}));
    }
    dispatch(wishlistActions.getWishlistIds());
  };

  const handleLoggedOutHeartIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLikeItPopup(true);
  };

  const handleHeartIcon = (e: React.MouseEvent) =>
    token ? toggleIsLiked(e) : handleLoggedOutHeartIcon(e);

  return (
    <>
      <div className={`${styles.wrapper} ${cardClasses}`}>
        <Link
          to="/video/[id]"
          as={`/video/${id}`}
          className={styles.wrapper__film}>
          <div className={styles.wrapper__film__absolute}>
            <Button className={isLikedClasses} onClick={handleHeartIcon}>
              <HeartLikesIcon />
            </Button>
          </div>
          <Image src={CategoryImage} alt={'Category Image'} />
          <Typography tagName="span" className={styles.wrapper__film__time}>
            {durationMinutes} : {durationSec}
          </Typography>
        </Link>
        <div className={styles.wrapper__other}>
          <Link
            to="/video/[id]"
            as={`/video/${id}`}
            className={styles.wrapper__other_name}>
            {title[lng]}
          </Link>
          <span className={styles.wrapper__other__dw_date}>{createdDate}</span>
        </div>
        <p className={styles.wrapper__pr_description}>{description[lng]}</p>
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
      <WishlistModal expanded={isLikeItPopup} setExpanded={setIsLikeItPopup} />
    </>
  );
};

export default FilmCard;
