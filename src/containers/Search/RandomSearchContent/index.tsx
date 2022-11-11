import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {isEqual} from 'lodash';

import {VideosSearchService} from '~/api';
import {FilmCard, Pagination, Typography} from '~/components';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {wishlistSelect} from '~/store/wishlist';
import FilmCardSkeleton from '~/components/skeletons/FilmCard';
import {useAppSelector, useRandomCategoryParams, useWindowSize} from '~/hooks';
import {QueryParamsTypes} from '~/types';
import {setQueryParams} from '~/utils';

import styles from '../Search.module.scss';
import {SearchPropsTypes} from '../types';

const RandomSearchContent: React.FC<SearchPropsTypes> = ({setTotalCount}) => {
  const {query, asPath} = useRouter();
  const {isMinTablet} = useWindowSize();

  const {wishlistIds: wishlist} = useAppSelector(wishlistSelect);

  const {params} = useRandomCategoryParams(
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
  );

  const {data, isLoading} = VideosSearchService.useRandomVideosSearch(
    query.param as string,
    params,
  );

  const videos = data?.videos;
  const videosCount = data?.totalCount;

  const queryPage = query?.page;
  const currentPage =
    asPath.includes('page=0') || !queryPage ? 0 : Number(queryPage);

  const [activePage, setActivePage] = useState<number>(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
  );

  useEffect(() => {
    setTotalCount(videosCount);
  }, [videosCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    if (isMinTablet) {
      setActivePage(0);
    }
  }, [isMinTablet]);

  useEffect(() => {
    if (!isEqual(INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE, rowsPerPage)) {
      setRowsPerPage(INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE);
    }

    setActivePage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number) => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > videosCount
      ? videosCount && videosCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const desktopSkeletonsCount =
    (activePage + 1) * INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE > videosCount
      ? videosCount % INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE
      : INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE;

  const skeletonsCount = !isMinTablet
    ? desktopSkeletonsCount
    : tabletSkeletonsCount;

  const renderResultListSkeletons = Array.from(
    Array(skeletonsCount),
    (_, index: number) => (
      <FilmCardSkeleton
        key={`categoryContent${index}`}
        cardClasses={styles.content__wrapper_item}
      />
    ),
  );

  const renderResultList = !isLoading
    ? videos?.map((item) => {
        return (
          <FilmCard
            item={item}
            key={item.id}
            cardClasses={styles.wrapper__content__result__card}
            wishlist={wishlist}
          />
        );
      })
    : renderResultListSkeletons;

  return (
    <div className={styles.wrapper__content}>
      <section className={styles.wrapper__content__result}>
        {renderResultList}
        {videos?.length === 0 && (
          <div className={styles.wrapper__content__result__wrapper}>
            <Typography
              className={styles.wrapper__content__result__wrapper__null}>
              sorryWeCouldNotFindAnyResult
            </Typography>
            <p
              className={
                styles.wrapper__content__result__wrapper__search_result
              }>
              {query.param}
            </p>
          </div>
        )}
      </section>
      <section>
        {videosCount > INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE && (
          <Pagination
            dataLength={videosCount}
            isPerPageNeeded={false}
            setActivePage={changeActivePage}
            activePage={activePage}
            isMoreButtonNeeded={false}
            rowsPerPage={INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE}
          />
        )}
      </section>
    </div>
  );
};

export default RandomSearchContent;
