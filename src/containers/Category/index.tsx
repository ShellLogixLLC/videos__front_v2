import React from 'react';

import {FilmCard} from '~/components';

import styles from './Category.module.scss';

const Category: React.FC = () => {
  const filmsss = [{}, {}, {}, {}, {}, {}, {}];
  const renderAllFim = filmsss.map((item, index) => <FilmCard key={index} />);

  return (
    <div className={styles.new_container}>
      <div className={styles.new_container__wrapper}>{renderAllFim}</div>
    </div>
  );
};

export default Category;
