import React from 'react';

import styles from './CategoryCard.module.scss';

const CategoryCardSkeleton: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.container__content} />
    <div className={styles.container__name}>
      <p />
    </div>
  </div>
);

export default CategoryCardSkeleton;
