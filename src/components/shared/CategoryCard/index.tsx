import React from 'react';

import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC = ({children}) => (
  <div className={styles.container}>
    <div className={styles.container__content} />
    <span className={styles.container__name}>{children}</span>
  </div>
);

export default CategoryCard;
