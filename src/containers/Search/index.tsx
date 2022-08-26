import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {VideosSearchService} from '~/api';
import {filteredMass, setQueryParams} from '~/utils';
import {
  BackButton,
  CategoryNav,
  DatePicker,
  FilmCard,
  FilterBySort,
  Pagination,
  Typography,
} from '~/components';
import {LeftArrowIcon} from '~/assets';
import {
  INITIAL_PAGINATION_ACTIVE_PAGE,
  INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import {wishlistSelect} from '~/store/wishlist';
import FilmCardSkeleton from '~/components/skeletons/FilmCard';
import {QueryParamsTypes} from '~/types';
import {useAppSelector, useLocales, useWindowSize} from '~/hooks';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {query, asPath} = useRouter();

  const queryPage = query?.page;
  const currentPage =
    asPath.includes('page=0') || !queryPage ? 0 : Number(queryPage);

  const {isMinTablet} = useWindowSize();

  const {wishlistIds: wishlist} = useAppSelector(wishlistSelect);

  const [activePage, setActivePage] = useState<number>(currentPage);

  const offset =
    activePage > INITIAL_PAGINATION_ACTIVE_PAGE
      ? activePage * INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE
      : INITIAL_PAGINATION_ACTIVE_PAGE;

  const {videosData, isLoading} = VideosSearchService.useVideosSearch(
    query.param,
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
    offset,
  );

  const setNewQueryParams = (newQueryParams: QueryParamsTypes): void => {
    setQueryParams({...query, ...newQueryParams});
  };

  const changeActivePage = (page: number) => {
    setActivePage(page);
    setNewQueryParams({page});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  useEffect(() => {
    if (isMinTablet) {
      setActivePage(0);
    }
  }, [isMinTablet]);

  const videos = videosData?.videos;
  const totalCount = videosData?.totalCount;
  const skeletonsArray = new Array(
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
  ).fill({});

  const {translatedTypo} = useLocales('back');

  const renderResultListSkeletons = skeletonsArray?.map(({index}) => (
    <FilmCardSkeleton
      key={index}
      cardClasses={styles.wrapper__content__result__card}
    />
  ));

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
    <article className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <section>
          <div className={styles.wrapper__content__header}>
            <BackButton
              text={translatedTypo || ''}
              LeftIcon={LeftArrowIcon}
              className={styles.wrapper__content__header__route}
            />
            <CategoryNav isNotActive={totalCount <= 0} />
            <Typography className={styles.wrapper__content__header__title}>
              searchResults
            </Typography>
          </div>
        </section>
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
          {totalCount > INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE && (
            <Pagination
              dataLength={totalCount}
              isPerPageNeeded={false}
              setActivePage={changeActivePage}
              activePage={activePage}
              isMoreButtonNeeded={false}
              rowsPerPage={INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE}
            />
          )}
        </section>
      </div>

      <aside className={styles.filter_block}>
        <DatePicker />
        <FilterBySort options={filteredMass} />
      </aside>
    </article>
  );
};

export default Search;
