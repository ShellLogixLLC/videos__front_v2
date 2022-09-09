import React, {useEffect, useState} from 'react';

import {CategoryService} from '~/api';
import {CategoryContentTypes, VideosProps} from '~/types';
import {
  FilmCard,
  Typography,
  CategoryNav,
  FilmCardSkeleton,
} from '~/components';
import {useAppSelector, useCategotyParams, useWindowSize} from '~/hooks';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {wishlistSelect} from '~/store/wishlist';

import styles from '../Category.module.scss';

const CategoryContent: React.FC<CategoryContentTypes> = ({
  activePage,
  totalCount,
  rowsPerPage,
  setTotalCount,
  subCategoryLoading,
}) => {
  const {params} = useCategotyParams(rowsPerPage);
  const {isMinTablet} = useWindowSize();

  const [videosList, setVideosList] = useState<VideosProps[]>([]);

  const {data, isLoading} = CategoryService.useVideosByCategoryId(params);
  const {wishlistIds: wishlist} = useAppSelector(wishlistSelect);

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > totalCount
      ? totalCount && totalCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const desktopSkeletonsCount =
    (activePage + 1) * INITIAL_PAGINATION_ROWS_PER_PAGE > totalCount
      ? totalCount % INITIAL_PAGINATION_ROWS_PER_PAGE
      : INITIAL_PAGINATION_ROWS_PER_PAGE;

  const skeletonsCount = !isMinTablet
    ? desktopSkeletonsCount
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
    (_, index: number) => (
      <FilmCardSkeleton
        key={`categoryContent${index}`}
        cardClasses={styles.content__wrapper_item}
      />
    ),
  );

  const renderVideosList = videosList?.map((item: VideosProps) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.content__wrapper_item}
      wishlist={wishlist}
    />
  ));

  const renderContent =
    isLoading && !isMinTablet ? (
      <div className={styles.content__wrapper}>{renderLoaderCards}</div>
    ) : (
      <div className={styles.content__wrapper}>
        {videosList.length ? (
          renderVideosList
        ) : (
          <Typography className={styles.content__wrapper__emptyText}>
            sorryWeCouldNotFindAnyResult
          </Typography>
        )}
        {isLoading && isMinTablet && <>{renderLoaderCards}</>}
      </div>
    );

  return (
    <>
      {subCategoryLoading && <CategoryNav isNotActive={dataTotalCount <= 0} />}
      {renderContent}
    </>
  );
};

export default CategoryContent;
