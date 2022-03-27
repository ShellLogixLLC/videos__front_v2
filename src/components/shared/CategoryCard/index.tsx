import React from 'react';

import {CategoryCardProps} from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({text = 'Text'}) => (
  <div className={styles.container}>
    <div className={styles.container__content} />
    <span className={styles.container__name}>{text}</span>
  </div>
);

export default CategoryCard;
