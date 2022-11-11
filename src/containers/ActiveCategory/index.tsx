import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {LeftArrowIcon} from '~/assets';
import {wishlistSelect} from '~/store/wishlist';
import {setQueryParams} from '~/utils';
import {CategoryService} from '~/api';
import {QueryParamsTypes, VideosProps} from '~/types';
import {
  useLocales,
  useWindowSize,
  useAppSelector,
  useActiveCategoryParams,
} from '~/hooks';
import {
  CategoryFilters,
  ActiveCategoryPathname,
  INITIAL_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {
  FilmCard,
  BackButton,
  Pagination,
  DatePicker,
  Typography,
  FilmCardSkeleton,
} from '~/components';

import styles from './ActiveCategory.module.scss';

const ActiveCategory: React.FC = () => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();

  const currentPerPageCount = INITIAL_PAGINATION_ROWS_PER_PAGE;

  const currentActiveCategory =
    query.name === ActiveCategoryPathname.Most_Liked
      ? CategoryFilters.MostLiked
      : CategoryFilters.New;

  const activeCategoryName =
    query.name === ActiveCategoryPathname.Most_Viewed
      ? CategoryFilters.MostViewed
      : currentActiveCategory;

  const [activePage, setActivePage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(currentPerPageCount);

  const {params} = useActiveCategoryParams(rowsPerPage);
  const {wishlistIds: wishlist} = useAppSelector(wishlistSelect);

  const queryPage = query?.page;

  const {data, isLoading} = CategoryService.useActiveCategory(params);
  const videos = data?.videos;
  const videosCount = data?.totalCount;

  const tabletSkeletonsCount =
    rowsPerPage + INITIAL_PAGINATION_ROWS_PER_PAGE > videosCount
      ? videosCount && videosCount % INITIAL_PAGINATION_ROWS_PER_PAGE
      : INITIAL_PAGINATION_ROWS_PER_PAGE;

  const desktopSkeletonsCount =
    (activePage + 1) * INITIAL_PAGINATION_ROWS_PER_PAGE > videosCount
      ? videosCount % INITIAL_PAGINATION_ROWS_PER_PAGE
      : INITIAL_PAGINATION_ROWS_PER_PAGE;

  const skeletonsCount = !isMinTablet
    ? desktopSkeletonsCount
    : tabletSkeletonsCount;

  useEffect(() => {
    if (queryPage) {
      setActivePage(Number(queryPage));
    }
  }, [queryPage]);

  useEffect(() => {
    if (isMinTablet) {
      setActivePage(0);
    }
    setRowsPerPage(INITIAL_PAGINATION_ROWS_PER_PAGE);
  }, [isMinTablet]);

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number): void => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  const renderLoaderCards = Array.from(
    Array(skeletonsCount),
    (index: number) => (
      <FilmCardSkeleton
        key={index}
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
        {videosCount
          ? renderVideosList
          : !isLoading && (
              <Typography className={styles.content__wrapper__emptyText}>
                sorryWeCouldNotFindAnyResult
              </Typography>
            )}
        {isLoading && isMinTablet && <>{renderLoaderCards}</>}
      </div>
    );

  const {translatedTypo: translatedBackText} = useLocales('back');

  return (
    <article>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.content__backRoute}>
            <BackButton
              text={translatedBackText || ''}
              LeftIcon={LeftArrowIcon}
              className={styles.content__backRoute__button}
            />
          </div>
          {isLoading ? (
            <div className={styles.content__title__skeleton} />
          ) : (
            <Typography tagName="h1" className={styles.content__title}>
              {activeCategoryName}
            </Typography>
          )}
          {renderContent}
          {videosCount > currentPerPageCount && (
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
        </div>
        <div className={styles.filters}>
          <DatePicker />
        </div>
      </div>
    </article>
  );
};

export default ActiveCategory;
