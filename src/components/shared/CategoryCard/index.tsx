import React from 'react';
import Image from 'next/image';

import {CategoryImage} from '~/assets';

import {CategoryCardProps} from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({item}) => {
  const {name} = item;

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <Image
          src={CategoryImage}
          className={styles.container__content__img}
          alt="Category"
        />
      </div>
      <span className={styles.container__name}>{name?.en}</span>
    </div>
  );
};

export default CategoryCard;
