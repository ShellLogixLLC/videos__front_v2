import React from 'react';

import {
  BackButton,
  FilmCardSkeletons,
  Link,
  Typography,
  Video,
} from '~/components';
import {LeftArrow} from '~/assets';
import WishlistSearchService from '~/api/wishlist';
import {INITIAL_WISHLIST_LIMIT, INITIAL_WISHLIST_OFFSET} from '~/constants';

import styles from './MyFavorites.module.scss';

const MyFavorites: React.FC = () => {
  const {data, isLoading} = WishlistSearchService.useVideoWishlist(
    INITIAL_WISHLIST_LIMIT,
    INITIAL_WISHLIST_OFFSET,
  );

  if (isLoading) {
    const renderLoaderCards = Array.from(Array(9), (index: number) => (
      <FilmCardSkeletons
        key={index}
        cardClasses={styles.content__wrapper_item}
      />
    ));
  }

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__backRoute}>
        <BackButton
          text="Back"
          LeftIcon={LeftArrow}
          className={styles.favorites__backRoute__button}
        />
      </div>

      <div className={styles.favorites__title}>
        <Typography tagName="h1" className={styles.favorites__title__text}>
          WishList
        </Typography>
      </div>

      <div className={styles.favorites__content}></div>
      <div className={styles.favorites__pagination}></div>
    </div>
  );
};

export default MyFavorites;
