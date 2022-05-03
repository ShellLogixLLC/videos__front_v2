import React from 'react';

import {CategoryImage} from '~/assets';
import {CategoriesProps} from '~/types';
import {CategoryCardSkeleton} from '~/components';

import Image from '../Image';

import {CategoryCardProps} from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({item, isLoading}) => {
  const {name} = item as CategoriesProps;

  return isLoading ? (
    <CategoryCardSkeleton />
  ) : (
    <div className={styles.container}>
      <Image
        src={CategoryImage}
        alt="Category"
        className={styles.container__content}
      />
      <span className={styles.container__name}>{name?.en}</span>
    </div>
  );
};

export default CategoryCard;
