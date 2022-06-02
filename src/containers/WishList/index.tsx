import React, {useState} from 'react';

import {
  BackButton,
  Button,
  FilmCard,
  FilmCardSkeletons,
  Pagination,
  Typography,
} from '~/components';
import {LeftArrow} from '~/assets';
import WishlistSearchService from '~/api/wishlist';
import {
  INITIAL_PAGINATION_ACTIVE_PAGE,
  INITIAL_WISHLIST_LIMIT,
} from '~/constants';
import FilmCardSkeleton from '~/components/skeletons/FilmCard';
import {client} from '~/api';
import {WishlistProps} from '~/types';

import styles from './Wishlist.module.scss';

const MyFavorites: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(
    INITIAL_PAGINATION_ACTIVE_PAGE,
  );
  const [totalCount, setTotalCount] = useState<number>(0);

  const {data, isLoading} = WishlistSearchService.useVideoWishlist(
    INITIAL_WISHLIST_LIMIT,
    activePage * INITIAL_WISHLIST_LIMIT,
  );

  if (isLoading) {
    const renderLoaderCards = Array.from(Array(9), (index: number) => (
      <FilmCardSkeletons
        key={index}
        cardClasses={styles.content__wrapper_item}
      />
    ));
    return <div className={styles.content__wrapper}>{renderLoaderCards}</div>;
  }

  const renderWishlistVideos = data.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <FilmCard item={item} cardClasses={styles.favorites__content__card} />
      </React.Fragment>
    );
  });

  const postVideo = async () => {
    client.post('/favorites');
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

      <div className={styles.favorites__content}>
        <div className={styles.favorites__content__wrapper}>
          {renderWishlistVideos}
        </div>
      </div>
      <div className={styles.favorites__pagination}>
        <Pagination
          activePage={activePage}
          dataLength={totalCount}
          rowsPerPage={INITIAL_WISHLIST_LIMIT}
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
