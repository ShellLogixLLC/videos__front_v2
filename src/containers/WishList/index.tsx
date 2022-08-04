import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {setQueryParams} from '~/utils';
import {useLocales, useWindowSize} from '~/hooks';
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
  Route,
} from '~/constants';
import {
  BackButton,
  FilmCard,
  FilmCardSkeletons,
  Link,
  Pagination,
  Typography,
} from '~/components';
import WishlistSearchService from '~/api/wishlist';

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

  const {data, mutate, isLoading} = WishlistSearchService.useVideoWishlist(
    limit,
    offset,
  );

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, [isLoading]);

  const refreshVideos = (
    type: WishlistActions,
    item: VideosProps | CategoriesProps,
  ) => {
    const updatedVideos = videosList.filter((video) => video.id !== item.id);
    if (type === WishlistActions.ADD) {
      setVideosList([...updatedVideos, item as VideosProps]);
      setTotalCount(totalCount + 1);
    } else {
      setVideosList(updatedVideos);
      setTotalCount(totalCount - 1);
    }
  };

  // const tabletSkeletonsCount =
  //   rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > totalCount
  //     ? totalCount && totalCount % INITIAL_PAGINATION_MORE_COUNT
  //     : INITIAL_PAGINATION_MORE_COUNT;

  // const skeletonsCount = !isMinTablet
  //   ? totalCount < INITIAL_WISHLIST_LIMIT * (activePage + 1)
  //     ? totalCount && totalCount % INITIAL_WISHLIST_LIMIT
  //     : INITIAL_WISHLIST_LIMIT
  //   : tabletSkeletonsCount;

  //This should be discussed

  const {translatedTypo} = useLocales('back');

  useEffect(() => {
    if (!isLoading) {
      setVideosList(data.videos);
      mutate();
      setTotalCount(data.totalCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount]);

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

  const renderLoaderCards = Array.from(Array(3), (index: number) => (
    <FilmCardSkeletons
      key={index}
      cardClasses={styles.favorites__content__card}
    />
  ));

  if (isLoading && !isMinTablet) {
    return (
      <div className={styles.favorites__content__wrapper}>
        {renderLoaderCards}
      </div>
    );
  }

  const renderWishlistVideos = data?.videos?.map((item: VideosProps) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.favorites__content__card}
      isFavorite={true}
      isWishlistPage={true}
      refreshVideos={refreshVideos}
    />
  ));

  const renderEmptyText = (
    <div className={styles.favorites__empty}>
      <Typography tagName="span" className={styles.favorites__empty__title}>
        yourWishlistIsEmpty
      </Typography>
      <div className={styles.favorites__empty__wrapper}>
        <Typography tagName="span" className={styles.favorites__empty__title}>
          exploreMoreAndShortlist
        </Typography>
        <Link className={styles.favorites__empty__link} to={Route.Home}>
          <Typography
            tagName="span"
            className={styles.favorites__empty__link__text}>
            startExploring
          </Typography>
        </Link>
      </div>
    </div>
  );

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
        {data.totalCount > 0 ? renderWishlistVideos : renderEmptyText}
      </div>

      {isLoading && (
        <div className={styles.favorites__content__wrapper}>
          {renderLoaderCards}
        </div>
      )}

      {data.totalCount > limit && (
        <div className={styles.favorites__pagination}>
          <Pagination
            dataLength={data.totalCount}
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
