import React from 'react';

import {CategoryImage} from '~/assets';
import {CategoriesProps} from '~/types';
import {CategoryCardSkeleton, Link} from '~/components';

import Image from '../Image';

import {CategoryCardProps} from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({item, isLoading}) => {
  const {name, id} = item as CategoriesProps;

  return isLoading ? (
    <CategoryCardSkeleton />
  ) : (
    <Link
      to="/category/[name]"
      as={`/category/${id}`}
      className={styles.container}>
      <Image
        src={CategoryImage}
        alt="Category"
        className={styles.container__content}
      />
      <span className={styles.container__name}>{name?.en}</span>
    </Link>
  );
};

export default CategoryCard;
