import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {useWindowSize} from '~/hooks';
import {CategoryService} from '~/api';
import {CategoryContentTypes, VideosProps} from '~/types';
import {FilmCard, FilmCardSkeletons, Typography} from '~/components';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
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

  const [videosList, setVideosList] = useState<VideosProps[]>([]);

  const queryEndDate = query?.endDate;
  const queryStartDate = query?.startDate;

  const endDate = queryEndDate ? String(queryEndDate) : '';
  const startDate = queryStartDate ? String(queryStartDate) : '';
  const likesSort = Number(query?.likesSort) || '';
  const viewsSort = Number(query?.viewsSort) || '';
  const durationSort = Number(query?.durationSort) || '';

  const limit = isMinTablet ? rowsPerPage : INITIAL_PAGINATION_ROWS_PER_PAGE;
  const offset = !isMinTablet
    ? activePage * INITIAL_PAGINATION_ROWS_PER_PAGE
    : 0;

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

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > totalCount
      ? totalCount && totalCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const skeletonsCount = !isMinTablet
    ? (activePage + 1) * INITIAL_PAGINATION_ROWS_PER_PAGE > totalCount
      ? totalCount % INITIAL_PAGINATION_ROWS_PER_PAGE
      : INITIAL_PAGINATION_ROWS_PER_PAGE
    : tabletSkeletonsCount;

  const dataVideos = data?.videos;
  const dataTotalCount = data?.totalCount;

  useEffect(() => {
    setTotalCount(dataTotalCount);
    if (dataVideos) {
      setVideosList(dataVideos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const renderLoaderCards = Array.from(
    Array(skeletonsCount),
    (index: number) => (
      <FilmCardSkeletons
        key={index}
        cardClasses={styles.content__wrapper_item}
      />
    ),
  );

  if (isLoading && !isMinTablet) {
    return <div className={styles.content__wrapper}>{renderLoaderCards}</div>;
  }

  const renderVideosList = videosList?.map((item: VideosProps) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.content__wrapper_item}
    />
  ));

  const renderContent =
    isLoading && !isMinTablet ? (
      <div className={styles.content__wrapper}>{renderLoaderCards}</div>
    ) : (
      <div className={styles.content__wrapper}>
        {dataTotalCount !== 0 ? (
          renderVideosList
        ) : (
          <Typography>sorryWeCouldNotFindAnyResult</Typography>
        )}
        {isLoading && isMinTablet && <>{renderLoaderCards}</>}
      </div>
    );

  return <>{renderContent}</>;
};

export default CategoryContent;
