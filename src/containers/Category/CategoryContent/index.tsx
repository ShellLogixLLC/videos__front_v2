import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {useWindowSize} from '~/hooks';
import {CategoryService} from '~/api';
import {CategoryContentTypes} from '~/types';
import {FilmCard, FilmCardSkeletons, Typography} from '~/components';
import {
  INITIAL_WISHLIST_LIMIT,
  INITIAL_PAGINATION_MORE_COUNT,
} from '~/constants';

import styles from '../Category.module.scss';

const CategoryContent: React.FC<CategoryContentTypes> = ({
  activePage,
  totalCount,
  categoryId,
  rowsPerPage,
  setTotalCount,
}) => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();

  const endDate = query?.endDate ? String(query?.endDate) : '';
  const startDate = query?.startDate ? String(query?.startDate) : '';
  const likesSort = Number(query?.likesSort) || '';
  const viewsSort = Number(query?.viewsSort) || '';
  const durationSort = Number(query?.durationSort) || '';

  const limit = !isMinTablet ? INITIAL_WISHLIST_LIMIT : rowsPerPage;
  const offset = !isMinTablet ? activePage * INITIAL_WISHLIST_LIMIT : 0;

  const {data, isLoading} = CategoryService.useVideosByCategoryId(
    limit,
    offset,
    categoryId,
    startDate,
    endDate,
    likesSort,
    viewsSort,
    durationSort,
  );

  const [videosList, setVideosList] = useState<any>([]);

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > totalCount
      ? totalCount && totalCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const skeletonsCount = !isMinTablet
    ? totalCount < INITIAL_WISHLIST_LIMIT * activePage
      ? totalCount && totalCount % INITIAL_WISHLIST_LIMIT
      : INITIAL_WISHLIST_LIMIT
    : tabletSkeletonsCount;

  useEffect(() => {
    // if (data) {
    setTotalCount(data?.totalCount);
    setVideosList(data?.videos);
    // }
  }, [data, setTotalCount]);

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
    return <div className={styles.content__wrapper}>{renderLoaderCards}</div>;
  }

  const renderVideosList = videosList?.map((item: any) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.content__wrapper_item}
    />
  ));

  return (
    <>
      <div className={styles.content__wrapper}>
        {totalCount ? (
          renderVideosList
        ) : (
          <Typography>sorryWeCouldNotFindAnyResult</Typography>
        )}
      </div>
      {isLoading && (
        <div className={styles.content__wrapper}>{renderLoaderCards}</div>
      )}
    </>
  );
};

export default CategoryContent;
