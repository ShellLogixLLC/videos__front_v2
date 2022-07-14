import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {CategorySorts} from '~/constants';
import {CategoryTitleTypes} from '~/types';
import {categoryNavigation, chooseCategorySort} from '~/utils/index';

import Button from '../Button';
import Typography from '../Typography';

import styles from './CategoryNav.module.scss';

const CategoryNav: React.FC<CategoryTitleTypes> = () => {
  const router = useRouter();
  const {query} = router;

  const [activeCategory, setActiveCategory] = useState<string | string[]>(
    query?.activeCategory || CategorySorts.All,
  );

  useEffect(() => {
    if (query?.activeCategory) {
      setActiveCategory(query?.activeCategory);
    }
  }, [query]);

  const buttonClasses = (nameCategory: string) =>
    classNames(styles.wrapper__buttons, {
      [styles.wrapper__buttons__active]: activeCategory === nameCategory,
    });

  const renderCategoryNavigation = categoryNavigation.map(
    ({nameCategory, id}) => (
      <Button
        key={id}
        onClick={() =>
          chooseCategorySort(
            nameCategory,
            query,
            activeCategory,
            setActiveCategory,
          )
        }
        className={buttonClasses(nameCategory)}>
        <Typography>{nameCategory}</Typography>
      </Button>
    ),
  );

  return <nav className={styles.wrapper}>{renderCategoryNavigation}</nav>;
};

export default CategoryNav;
