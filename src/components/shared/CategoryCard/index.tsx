import React from 'react';

import {CategoryImage} from '~/assets';
import {CategoriesProps} from '~/types';
import {getCookieFromBrowser} from '~/libraries';
import {CategoryCardSkeleton, Link, Typography} from '~/components';

import Image from '../Image';

import {CategoryCardProps} from './types';
import styles from './CategoryCard.module.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({item, isLoading}) => {
  const lng = (getCookieFromBrowser('activeLang') as string) || 'en';

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
      <Typography tagName="span" className={styles.container__name}>
        {name[lng]}
      </Typography>
    </Link>
  );
};

export default CategoryCard;
