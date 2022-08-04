import React, {useEffect, useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {wishlistSelect} from '~/store/wishlist';
import {VIDEO_INITIAL_NAME} from '~/constants';
import {getCookieFromBrowser} from '~/libraries';
import {VideoLikes, WishlistModal} from '~/components';
import {HeartLikesIcon, ViewsCountIcon} from '~/assets/index';
import {useAppDispatch, useAppSelector} from '~/hooks';
import {addToWishlist, deleteFromWishlist} from '~/store/wishlist/thunks';

import {VideDescriptionTypes} from './types';
import styles from './VideDescription.module.scss';

const videDescriptionTextDefault = 'Have problems with the internet !';

const VideDescription: React.FC<VideDescriptionTypes> = ({
  createdAt,
  videoName = VIDEO_INITIAL_NAME,
  likeCount,
  viewCount,
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
            <div className={styles.wrapper__views_liked__block}>
              <VideoLikes likesCount={likeCount || 0} id={id} />
            </div>
            <span className={styles.wrapper__views_liked__block}>
              <ViewsCountIcon /> {viewCount}
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
