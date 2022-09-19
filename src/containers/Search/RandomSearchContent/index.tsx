import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {VideosSearchService} from '~/api';
import {FilmCard, Typography} from '~/components';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {VideosProps} from '~/types';
import {wishlistSelect} from '~/store/wishlist';
import FilmCardSkeleton from '~/components/skeletons/FilmCard';
import {useAppSelector, useRandomCategoryParams, useWindowSize} from '~/hooks';

import styles from '../Search.module.scss';
import {SearchPropsTypes} from '../types';

const RandomSearchContent: React.FC<SearchPropsTypes> = ({
  activePage,
  totalCount,
  setTotalCount,
  rowsPerPage,
}) => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();

  const {wishlistIds: wishlist} = useAppSelector(wishlistSelect);

  const [videosList, setVideosList] = useState<VideosProps[]>([]);

  const {params} = useRandomCategoryParams(
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
  );

  const {data, isLoading} = VideosSearchService.useRandomVideosSearch(
    query.param as string,
    params,
  );

  const dataVideos = data?.videos;
  const dataTotalCount = data?.totalCount;

  useEffect(() => {
    setTotalCount(dataTotalCount);
    if (dataVideos) {
      setVideosList(dataVideos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > totalCount
      ? totalCount && totalCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const desktopSkeletonsCount =
    (activePage + 1) * INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE > totalCount
      ? totalCount % INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE
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
    ? videosList?.map((item) => {
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
        {videosList?.length === 0 && (
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
    </div>
  );
};

export default RandomSearchContent;
