import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {
  BackButton,
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
import {useWindowSize} from '~/hooks';
import {QueryParamsTypes} from '~/types';
import {setQueryParams} from '~/utils';

import styles from './Wishlist.module.scss';

const MyFavorites: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(
    INITIAL_PAGINATION_ACTIVE_PAGE,
  );
  const [totalCount, setTotalCount] = useState<number>(0);

  const {isMinTablet} = useWindowSize();

  const {query} = useRouter();

  useEffect(() => {
    if (query?.page) {
      setActivePage(Number(query.page));
    }
  }, [query.page]);

  const {data, isLoading} = WishlistSearchService.useVideoWishlist(
    INITIAL_WISHLIST_LIMIT,
    activePage * INITIAL_WISHLIST_LIMIT,
  );

  const videos = data?.videos;
  const count = data?.totalCount;

  useEffect(() => {
    if (data && videos.length > 0) {
      setTotalCount(count);
    }
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });

    if (isMinTablet) {
      window.scrollTo({
        top: 80,
        behavior: 'smooth',
      });
    }
  }, [count, data, activePage]);

  if (isLoading) {
    const renderLoaderCards = Array.from(
      Array(INITIAL_WISHLIST_LIMIT),
      (index: number) => (
        <FilmCardSkeletons
          key={index}
          cardClasses={styles.favorites__content__card}
        />
      ),
    );
    return (
      <div className={styles.favorites__content__wrapper}>
        {renderLoaderCards}
      </div>
    );
  }

  const renderWishlistVideos = videos.map((item) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.favorites__content__card}
      isFavorite={true}
    />
  ));

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number) => {
    setActivePage(page);
    setNewQueryParams({page});
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

      <div className={styles.favorites__content__wrapper}>
        {renderWishlistVideos}
      </div>

      {!!totalCount && (
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
      )}
    </div>
  );
};

export default MyFavorites;
