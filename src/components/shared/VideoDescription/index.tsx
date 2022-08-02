import React, {useEffect, useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {WishlistModal} from '~/components';
import {wishlistSelect} from '~/store/wishlist';
import {getCookieFromBrowser} from '~/libraries';
import {useAppDispatch, useAppSelector} from '~/hooks';
import {addToWishlist, deleteFromWishlist} from '~/store/wishlist/thunks';
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
  const dispatch = useAppDispatch();
  const {query} = useRouter();
  const id = query.id as string;

  const token = getCookieFromBrowser('token');

  const {wishlistIds} = useAppSelector(wishlistSelect);
  const isVideoFavorite = wishlistIds?.includes(id) || false;

  const [isLiked, setIsLiked] = useState<boolean>(isVideoFavorite);
  const [isLikeItPopup, setIsLikeItPopup] = useState<boolean>(false);

  const formatCreatedDate = moment(createdAt).format('L');

  const isLikedClasses = classNames(styles.wrapper__title_block__heart_like, {
    [styles.wrapper__title_block__heart_dislike]: !isLiked,
  });

  useEffect(() => {
    if (isLiked !== isVideoFavorite) {
      setIsLiked(isVideoFavorite);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoFavorite]);

  const toggleIsLiked = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);

    if (!isLiked) {
      await dispatch(addToWishlist({videoId: id}));
    } else {
      await dispatch(deleteFromWishlist({videoId: id}));
    }
  };

  const handleLoggedOutHeartIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLikeItPopup(true);
  };

  const handleHeartIcon = (e: React.MouseEvent) =>
    token ? toggleIsLiked(e) : handleLoggedOutHeartIcon(e);

  return (
    <>
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
          <HeartLikesIcon
            onClick={handleHeartIcon}
            className={isLikedClasses}
          />
        </div>
        <h3 className={styles.wrapper__title_block__name}>{videoName}</h3>
        <p className={styles.wrapper__date}>{formatCreatedDate}</p>
        <p className={styles.wrapper__description}>{description}</p>
      </div>
      <WishlistModal expanded={isLikeItPopup} setExpanded={setIsLikeItPopup} />
    </>
  );
};

export default VideDescription;
