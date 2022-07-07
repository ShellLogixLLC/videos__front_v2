import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {filteredMass} from '~/utils';
import {VideosSearchService} from '~/api';
import {
  BackButton,
  CategoryNav,
  DatePicker,
  FilmCard,
  FilterBySort,
  Pagination,
  Typography,
} from '~/components';
import {LeftArrow} from '~/assets';
import {
  INITIAL_PAGINATION_ACTIVE_PAGE,
  INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
} from '~/constants';
import FilmCardSkeleton from '~/components/skeletons/FilmCard';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {query} = useRouter();

  const [activePage, setActivePage] = useState<number>(
    INITIAL_PAGINATION_ACTIVE_PAGE,
  );

  const offset =
    activePage > INITIAL_PAGINATION_ACTIVE_PAGE
      ? activePage * INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE + 1
      : INITIAL_PAGINATION_ACTIVE_PAGE;

  const {videosData, isLoading} = VideosSearchService.useVideosSearch(
    query.param,
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
    offset,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const videos = videosData?.videos;
  const totalCount = videosData?.totalCount;
  const skeletonsArray = new Array(
    INITIAL_SEARCH_PAGINATION_ROWS_PER_PAGE,
  ).fill({});

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
              text="Back"
              LeftIcon={LeftArrow}
              className={styles.wrapper__content__header__route}
            />
            <CategoryNav />
            <Typography className={styles.wrapper__content__header__title}>
              Search Results
            </Typography>
          </div>
        </section>
        <section className={styles.wrapper__content__result}>
          {renderResultList}
          {videos?.length === 0 && (
            <div className={styles.wrapper__content__result__wrapper}>
              <p className={styles.wrapper__content__result__wrapper__null}>
                Sorry, we could not find any result as:
              </p>
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
          {videos?.length > 0 && (
            <Pagination
              dataLength={totalCount}
              isPerPageNeeded={false}
              setActivePage={setActivePage}
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
