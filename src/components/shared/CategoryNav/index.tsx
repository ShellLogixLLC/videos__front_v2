import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {CategoryFilters} from '~/constants';
import {CategoryTitleTypes} from '~/types';
import {categoryNavigation, chooseCategorySort} from '~/utils/index';

import Button from '../Button';
import Typography from '../Typography';

import styles from './CategoryNav.module.scss';

const CategoryNav: React.FC<CategoryTitleTypes> = ({isNotActive}) => {
  const {query} = useRouter();

  const [activeCategory, setActiveCategory] = useState<string | string[]>(
    query?.activeCategory || CategoryFilters.All,
  );

  const queryActiveCategory = query?.activeCategory;

  const wrapperClassnames = classNames(styles.wrapper, {
    [styles.wrapper__unactive]: isNotActive,
  });

  useEffect(() => {
    if (queryActiveCategory) {
      setActiveCategory(queryActiveCategory);
    }
  }, [queryActiveCategory]);

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

  return <nav className={wrapperClassnames}>{renderCategoryNavigation}</nav>;
};

export default CategoryNav;
