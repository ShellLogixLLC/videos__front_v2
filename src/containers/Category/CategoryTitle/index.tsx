import React from 'react';

import {CategoryService} from '~/api';
import {CategoryTitleTypes} from '~/types';
import {getCookieFromBrowser} from '~/libraries';
import {CategoryNav, CategoryNavSkeleton, Typography} from '~/components';

import styles from '../Category.module.scss';

const CategoryTitle: React.FC<CategoryTitleTypes> = ({categoryId}) => {
  const lng = getCookieFromBrowser('activeLang');

  const {data, isLoading} = CategoryService.useCategoryById(categoryId);

  if (isLoading) {
    return <CategoryNavSkeleton />;
  }

  const {name} = data;

  return (
    <>
      <Typography tagName="h1" className={styles.content__title}>
        {name[lng]}
      </Typography>
      <CategoryNav />
    </>
  );
};

export default CategoryTitle;
