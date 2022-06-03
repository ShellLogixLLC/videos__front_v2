import React, {useEffect} from 'react';

import {CategoryService} from '~/api';
import {CategoryContentTypes} from '~/types';
import {FilmCard, FilmCardSkeletons, Typography} from '~/components';

import styles from '../Category.module.scss';

const CategoryContent: React.FC<CategoryContentTypes> = ({
  activePage,
  categoryId,
  setTotalCount,
}) => {
  const {data, isLoading} = CategoryService.useVideosByCategoryId(
    9,
    activePage * 9,
    categoryId,
  );

  useEffect(() => {
    if (data?.totalCount) {
      setTotalCount(data?.totalCount);
    }
  }, [data, setTotalCount]);

  console.log(data, 'datta');

  if (isLoading) {
    const renderLoaderCards = Array.from(Array(9), (index: number) => (
      <FilmCardSkeletons
        key={index}
        cardClasses={styles.content__wrapper_item}
      />
    ));

    return <div className={styles.content__wrapper}>{renderLoaderCards}</div>;
  }

  const {videos, totalCount} = data;

  const renderVideosList = videos.map((item) => (
    <FilmCard
      key={item.id}
      item={item}
      cardClasses={styles.content__wrapper_item}
    />
  ));

  return (
    <div className={styles.content__wrapper}>
      {totalCount ? (
        renderVideosList
      ) : (
        <Typography>Sorry, we could not find any result</Typography>
      )}
    </div>
  );
};

export default CategoryContent;
