import React, {useState} from 'react';
import axios from 'axios';

import {
  BackButton,
  Button,
  FilmCardSkeletons,
  Link,
  Pagination,
  Typography,
  Video,
} from '~/components';
import {LeftArrow} from '~/assets';
import WishlistSearchService from '~/api/wishlist';
import {
  INITIAL_WISHLIST_LIMIT,
  INITIAL_WISHLIST_OFFSET,
  Route,
} from '~/constants';
import {client} from '~/api';

import styles from './MyFavorites.module.scss';

const MyFavorites: React.FC = () => {
  const {data, isLoading} = WishlistSearchService.useVideoWishlist(
    INITIAL_WISHLIST_LIMIT,
    INITIAL_WISHLIST_OFFSET,
  );

  const [activePage, setActivePage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  if (isLoading) {
    const renderLoaderCards = Array.from(Array(9), (index: number) => (
      <FilmCardSkeletons
        key={index}
        cardClasses={styles.content__wrapper_item}
      />
    ));
    return <div className={styles.content__wrapper}>{renderLoaderCards}</div>;
  }

  if (data) {
    return <div>Data</div>;
  }

  const postVideo = async () => {
    // client.post(Route.Favorites);
  };

  const changeActivePage = (page: number) => {
    setActivePage(page);
  };

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

      <div className={styles.favorites__content}>This Should be Content</div>
      <div className={styles.favorites__pagination}>
        <Pagination
          activePage={activePage}
          dataLength={totalCount}
          rowsPerPage={9}
          setActivePage={changeActivePage}
          isPerPageNeeded={false}
          isMoreButtonNeeded={false}
        />
      </div>
      <div className={styles.favorites__post}>
        <Button className={styles.favorites__post__button} onClick={postVideo}>
          Post New Video
        </Button>
      </div>
    </div>
  );
};

export default MyFavorites;
