import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {isEqual} from 'lodash';

import {VideosService} from '~/api';
import {CategoryContentTypes, QueryParamsTypes, VideosProps} from '~/types';
import {
  FilmCard,
  Typography,
  CategoryNav,
  FilmCardSkeleton,
  Pagination,
} from '~/components';
import {useAppSelector, useRandomCategoryParams, useWindowSize} from '~/hooks';
import {
  INITIAL_PAGINATION_MORE_COUNT,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {wishlistSelect} from '~/store/wishlist';
import {setQueryParams} from '~/utils';

import styles from '../Category.module.scss';

const RandomCategoryContent: React.FC<CategoryContentTypes> = ({
  subCategoryLoading,
  setTotalCount,
}) => {
  const {query, asPath} = useRouter();
  const {isMinTablet} = useWindowSize();

  const queryPage = query?.page;

  const currentPage =
    asPath.includes('page=0') || !queryPage ? 0 : Number(queryPage);

  const [activePage, setActivePage] = useState<number>(currentPage);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    INITIAL_PAGINATION_ROWS_PER_PAGE,
  );

  const {params} = useRandomCategoryParams(rowsPerPage);

  const {videosData: data, isLoading} = VideosService.useRandomVideos(params);

  const videos = data?.videos;
  const videosCount = data?.totalCount;

  useEffect(() => {
    setTotalCount(videosCount);
  }, [videosCount]);

  const {wishlistIds: wishlist} = useAppSelector(wishlistSelect);

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_MORE_COUNT > videosCount
      ? videosCount && videosCount % INITIAL_PAGINATION_MORE_COUNT
      : INITIAL_PAGINATION_MORE_COUNT;

  const desktopSkeletonsCount =
    (activePage + 1) * INITIAL_PAGINATION_ROWS_PER_PAGE > videosCount
      ? videosCount % INITIAL_PAGINATION_ROWS_PER_PAGE
      : INITIAL_PAGINATION_ROWS_PER_PAGE;

  const skeletonsCount = !isMinTablet
    ? desktopSkeletonsCount
    : tabletSkeletonsCount;

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number): void => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  useEffect(() => {
    if (!isEqual(INITIAL_PAGINATION_ROWS_PER_PAGE, rowsPerPage)) {
      setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
    }

    setActivePage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderLoaderCards = Array.from(
    Array(skeletonsCount),
    (_, index: number) => (
      <FilmCardSkeleton
        key={`categoryContent${index}`}
        cardClasses={styles.content__wrapper_item}
      />
    ),
  );

  const renderVideosList = videos?.map((item: VideosProps) => (
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
        {videos.length ? (
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
      {subCategoryLoading && <CategoryNav isNotActive={videosCount <= 0} />}
      {renderContent}
      {videosCount > rowsPerPage && (
        <div className={styles.content__pagination}>
          <Pagination
            dataLength={videosCount}
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            setRowsPerPage={setRowsPerPage}
            setActivePage={changeActivePage}
            isPerPageNeeded={false}
          />
        </div>
      )}
    </>
  );
};

export default RandomCategoryContent;
