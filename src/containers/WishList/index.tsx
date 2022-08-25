import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {setQueryParams} from '~/utils';
import {
  useAppDispatch,
  useAppSelector,
  useLocales,
  useWindowSize,
} from '~/hooks';
import {
  CategoriesProps,
  QueryParamsTypes,
  VideosProps,
  WishlistActions,
} from '~/types';
import {
  INITIAL_PAGINATION_ACTIVE_PAGE,
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_WISHLIST_LIMIT,
} from '~/constants';
import {
  BackButton,
  EmptyWishlist,
  FilmCard,
  FilmCardSkeleton,
  Pagination,
  Typography,
} from '~/components';
import {wishlistActions, wishlistSelect} from '~/store/wishlist';
import {LoadingStates} from '~/store/types';

import styles from './Wishlist.module.scss';

const MyFavorites: React.FC = () => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();
  const currentPerPageCount = !isMinTablet
    ? INITIAL_WISHLIST_LIMIT
    : INITIAL_PAGINATION_MORE_COUNT;

  const [videosList, setVideosList] = useState<VideosProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(
    INITIAL_PAGINATION_ACTIVE_PAGE,
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(currentPerPageCount);

  const limit = !isMinTablet ? INITIAL_WISHLIST_LIMIT : rowsPerPage;
  const offset = !isMinTablet ? activePage * INITIAL_WISHLIST_LIMIT : 0;

  const dispatch = useAppDispatch();

  const {wishlistVideos: data, wishlistVideosLoading: isLoading} =
    useAppSelector(wishlistSelect);

  useEffect(() => {
    dispatch(wishlistActions.getWishlistVideos({limit, offset}));
  }, [dispatch, limit, offset]);

  useEffect(() => {
    if (data) {
      setVideosList(data.videos);
      setTotalCount(data.totalCount);
    }
  }, [data]);

  const refreshVideos = (
    type: WishlistActions,
    item: VideosProps | CategoriesProps,
  ) => {
    const updatedVideos = videosList.filter((video) => video.id !== item.id);
    if (type === WishlistActions.ADD) {
      if (updatedVideos.length) {
        setVideosList([...updatedVideos, item as VideosProps]);
        setTotalCount(totalCount);
      } else if (data?.videos?.length) {
        setActivePage(activePage);
      }
    } else if (type === WishlistActions.DELETE) {
      if (data?.videos?.length && !updatedVideos.length && activePage > 0) {
        setActivePage(activePage - 1);
      } else {
        setVideosList(updatedVideos);
        setTotalCount(totalCount - 1);
      }
    }
  };

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > totalCount
      ? totalCount && totalCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const desktopSkeletonsCount =
    totalCount < INITIAL_WISHLIST_LIMIT * (activePage + 1)
      ? totalCount % INITIAL_WISHLIST_LIMIT
      : INITIAL_WISHLIST_LIMIT;

  const skeletonsCount = !isMinTablet
    ? desktopSkeletonsCount
    : tabletSkeletonsCount;

  const {translatedTypo} = useLocales('back');

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
      <FilmCardSkeleton
        key={index}
        cardClasses={styles.favorites__content__card}
      />
    ),
  );

  if (isLoading === LoadingStates.LOADING && !isMinTablet) {
    return (
      <div className={styles.favorites__content__wrapper}>
        {renderLoaderCards}
      </div>
    );
  }

  const renderWishlistVideos = videosList.map((item: VideosProps) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.favorites__content__card}
      isFavorite={true}
      isWishlistPage={true}
      refreshVideos={refreshVideos}
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
          LeftIcon={LeftArrowIcon}
          className={styles.favorites__backRoute__button}
        />
      </div>

      <div className={styles.favorites__title}>
        <Typography tagName="h1" className={styles.favorites__title__text}>
          wishlist
        </Typography>
      </div>

      <div className={styles.favorites__content__wrapper}>
        {totalCount > 0 ? renderWishlistVideos : <EmptyWishlist />}
      </div>

      {isLoading === LoadingStates.LOADING && (
        <div className={styles.favorites__content__wrapper}>
          {renderLoaderCards}
        </div>
      )}

      {totalCount > limit && (
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
