import React from 'react';

import {categoryNavigation} from '~/utils/index';

import styles from './CategoryNav.module.scss';

const CategoryNavSkeleton: React.FC = () => {
  const renderSubcategoryList = categoryNavigation.map(({id, nameCategory}) => (
    <div key={id} className={styles.wrapper__content_item}>
      {nameCategory}
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__title} />
      <div className={styles.wrapper__content}>{renderSubcategoryList}</div>
    </div>
  );
};

export default CategoryNavSkeleton;
