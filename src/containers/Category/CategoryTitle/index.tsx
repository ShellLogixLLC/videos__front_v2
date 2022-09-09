import React from 'react';

import {useWindowSize} from '~/hooks';
import {CategoryService} from '~/api';
import {CategoryTitleTypes} from '~/types';
import {getCookieFromBrowser} from '~/libraries';
import {CategoryNavSkeleton, Typography} from '~/components';

import styles from '../Category.module.scss';

const CategoryTitle: React.FC<CategoryTitleTypes> = ({
  categoryId,
  setSubCategoryLoading,
}) => {
  const {isDesktop} = useWindowSize();
  const lng = (getCookieFromBrowser('activeLang') as string) || 'en';

  const {data, isLoading} = CategoryService.useCategoryById(categoryId);

  if (isLoading) {
    return <CategoryNavSkeleton />;
  }

  if (setSubCategoryLoading && !isLoading && isDesktop) {
    setSubCategoryLoading(true);
  }

  const {name} = data;

  return (
    <>
      <Typography tagName="h1" className={styles.content__title}>
        {name[lng]}
      </Typography>
    </>
  );
};

export default CategoryTitle;
