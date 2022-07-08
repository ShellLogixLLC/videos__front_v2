import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {LeftArrow} from '~/assets';
import {setQueryParams} from '~/utils';
import WishlistSearchService from '~/api/wishlist';
import {useWindowSize, useLocales} from '~/hooks';
import {QueryParamsTypes, VideosProps} from '~/types';
import {
  INITIAL_WISHLIST_LIMIT,
  INITIAL_PAGINATION_ACTIVE_PAGE,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {
  FilmCard,
  BackButton,
  Pagination,
  Typography,
  FilmCardSkeletons,
} from '~/components';

import styles from './Wishlist.module.scss';

const MyFavorites: React.FC = () => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();

  const [videosList, setVideosList] = useState<VideosProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(
    INITIAL_PAGINATION_ACTIVE_PAGE,
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_WISHLIST_LIMIT,
  );

  const limit = !isMinTablet ? INITIAL_WISHLIST_LIMIT : rowsPerPage;
  const offset = !isMinTablet ? activePage * INITIAL_WISHLIST_LIMIT : 0;

  const {data, isLoading} = WishlistSearchService.useVideoWishlist(
    limit,
    offset,
  );

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_ROWS_PER_PAGE > totalCount
      ? totalCount && totalCount % INITIAL_WISHLIST_LIMIT
      : INITIAL_PAGINATION_ROWS_PER_PAGE;

  const skeletonsCount = !isMinTablet
    ? totalCount < INITIAL_WISHLIST_LIMIT * (activePage + 1)
      ? totalCount && totalCount % INITIAL_WISHLIST_LIMIT
      : INITIAL_WISHLIST_LIMIT
    : tabletSkeletonsCount;

  const {translatedTypo} = useLocales('back');

  useEffect(() => {
    if (!isLoading) {
      setVideosList(data.videos);
      setTotalCount(data.totalCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (query?.page) {
      setActivePage(Number(query.page));
      window.scrollTo({
        top: 80,
        behavior: 'smooth',
      });
    }
  }, [query.page]);

  useEffect(() => {
    setRowsPerPage(INITIAL_WISHLIST_LIMIT);
    setActivePage(0);
  }, [isMinTablet]);

  const renderLoaderCards = Array.from(
    Array(skeletonsCount),
    (index: number) => (
      <FilmCardSkeletons
        key={index}
        cardClasses={styles.favorites__content__card}
      />
    ),
  );

  if (isLoading && !isMinTablet) {
    return (
      <div className={styles.favorites__content__wrapper}>
        {renderLoaderCards}
      </div>
    );
  }

  const renderWishlistVideos = videosList?.map((item: VideosProps) => (
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
          text={translatedTypo || ''}
          LeftIcon={LeftArrow}
          className={styles.favorites__backRoute__button}
        />
      </div>

      <div className={styles.favorites__title}>
        <Typography tagName="h1" className={styles.favorites__title__text}>
          wishlist
        </Typography>
      </div>

      <div className={styles.favorites__content__wrapper}>
        {renderWishlistVideos}
      </div>

      {isLoading && (
        <div className={styles.favorites__content__wrapper}>
          {renderLoaderCards}
        </div>
      )}

      {!!totalCount && (
        <div className={styles.favorites__pagination}>
          <Pagination
            dataLength={totalCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            activePage={activePage}
            setActivePage={changeActivePage}
            isPerPageNeeded={false}
          />
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
