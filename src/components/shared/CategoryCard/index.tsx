import React from 'react';
import Image from 'next/image';

import {CategoryImage} from '~/assets';
import {CategoriesProps} from '~/types';

import ImageComp from '../ImageComp';

import {CategoryCardProps} from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({item}) => {
  const {name} = item as CategoriesProps;

  return (
    <div className={styles.container}>
      <ImageComp
        src={CategoryImage}
        alt="Category"
        className={styles.container__content}
      />
      <span className={styles.container__name}>{name?.en}</span>
    </div>
  );
};

export default CategoryCard;
