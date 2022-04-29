import React from 'react';
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

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const {query} = useRouter();

  const {videosData, isLoading} = VideosSearchService.useVideosSearch(
    query.param,
  );
  const videos = videosData?.videos;
  const totalCount = videosData?.totalCount;

  const renderResultList = videos?.map((item, index) => (
    <FilmCard
      isLoading={isLoading}
      key={index}
      item={item}
      cardClasses={styles.wrapper__content__result__card}
    />
  ));

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
          {videos?.length ? (
            renderResultList
          ) : (
            <p className={styles.wrapper__content__result__null}>
              Not found!!!
            </p>
          )}
        </section>
        <section>
          <Pagination dataLength={totalCount} rowsPerPage={9} />
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
