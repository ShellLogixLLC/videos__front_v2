import React from 'react';

import {FilmCard} from '~/components';

import styles from './Category.module.scss';

const Category: React.FC = () => {
  return (
    <div className={styles.new_container}>
      <div className={styles.new_container__wrapper}>Category</div>
    </div>
  );
};

export default Category;
