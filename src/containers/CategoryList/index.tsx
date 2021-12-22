import React, {useState} from 'react';
import shortid from 'shortid';

import {FilterLamp, TopArrow, RightRedArrow} from '~/assets';
import {
  staticBase,
  staticFilterSortBase,
  staticFilterCategoryBase,
} from '~/utils';
import {Pagination, Filter, FilmCard, BackButton} from '~/components';

import styles from './CategoryList.module.scss';

const CategoryList: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dataLength = staticBase.length;

  const categoryFilms = staticBase.map(
    ({
      filmName,
      likeCount,
      viewsCount,
      uploadDate,
      globalTime,
      commentsCount,
      descriptionText,
    }) => (
      <FilmCard
        key={shortid.generate()}
        //
        filmName={filmName}
        likeCount={likeCount}
        viewsCount={viewsCount}
        uploadDate={uploadDate}
        globalTime={globalTime}
        commentsCount={commentsCount}
        descriptionText={descriptionText}
      />
    ),
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__film}>
        <BackButton
          text="Back"
          LeftIcon={RightRedArrow}
          className={styles.wrapper__film__back}
        />

        <h1 className={styles.wrapper__film__title}>Category Name</h1>

        <div className={styles.wrapper__film__container}>{categoryFilms}</div>
        <Pagination
          activePage={activePage}
          dataLength={dataLength}
          rowsPerPage={rowsPerPage}
          setActivePage={setActivePage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
      <div className={styles.wrapper__sort_block}>
        <Filter
          filterTitle="Categories"
          IconProp={TopArrow}
          options={staticFilterCategoryBase}
        />
        <Filter
          filterTitle="Sort by"
          IconProp={FilterLamp}
          options={staticFilterSortBase}
        />
      </div>
    </div>
  );
};

export default CategoryList;
