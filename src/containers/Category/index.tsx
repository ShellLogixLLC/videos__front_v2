import React from 'react';

import {FilmCard, CategoryNav, CategoryCard} from '~/components';

import styles from './Category.module.scss';

const Category: React.FC = () => {
  const filmsss = [{}, {}, {}, {}, {}, {}, {}];
  const renderAllFim = filmsss.map((item, index) => <FilmCard key={index} />);

  const renderAllCard = filmsss.map((item, index) => (
    <CategoryCard key={index} />
  ));
  return (
    <>
      <CategoryNav />
      <div className={styles.new_container}>
        <h2 className={styles.new_container__title}>New videos</h2>
        <div className={styles.new_container__wrapper}>{renderAllFim}</div>
      </div>
      <div className={styles.new_container}>
        <h2 className={styles.new_container__title}>New videos</h2>
        <div className={styles.new_container__wrapper}>{renderAllCard}</div>
      </div>
    </>
  );
};

export default Category;
