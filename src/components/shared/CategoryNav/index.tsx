import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {CategorySorts} from '~/constants';
import {categoryNavigation} from '~/utils/index';
import {CategoryTitleTypes} from '~/types';

import Button from '../Button';
import Typography from '../Typography';

import styles from './CategoryNav.module.scss';

const CategoryNav: React.FC<CategoryTitleTypes> = ({setActivePage}) => {
  const router = useRouter();
  const {query} = router;

  const [likesSort, setLikesSort] = useState<number | string>(
    Number(query?.likesSort) || '',
  );
  const [viewsSort, setViewsSort] = useState<number | string>(
    Number(query?.viewsSort) || '',
  );
  const [durationSort, setDurationSort] = useState<number | string>(
    Number(query?.durationSort) || '',
  );
  const [activeCategory, setActiveCategory] = useState<string | string[]>(
    query?.activeCategory || CategorySorts.All,
  );

  useEffect(() => {
    router.push({
      // pathname: router.pathname,
      query: {
        ...router.query,
        activeCategory,
        likesSort,
        viewsSort,
        durationSort,
        page: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const buttonClasses = (nameCategory: string) =>
    classNames(styles.wrapper__buttons, {
      [styles.wrapper__buttons__active]: activeCategory === nameCategory,
    });

  const chooseCategory = (nameCategory: string) => {
    if (nameCategory !== activeCategory) {
      setActivePage(0);
      setActiveCategory(nameCategory);
      if (CategorySorts.TopRated === nameCategory) {
        setLikesSort(-1);
        setViewsSort('');
        setDurationSort('');
      } else if (CategorySorts.TopViews === nameCategory) {
        setLikesSort('');
        setViewsSort(-1);
        setDurationSort('');
      } else if (CategorySorts.Duration === nameCategory) {
        setLikesSort('');
        setViewsSort('');
        setDurationSort(-1);
      }
    }
  };

  const renderCategoryNavigation = categoryNavigation.map(
    ({nameCategory, id}) => (
      <Button
        key={id}
        onClick={() => chooseCategory(nameCategory)}
        className={buttonClasses(nameCategory)}>
        <Typography>{nameCategory}</Typography>
      </Button>
    ),
  );

  return <nav className={styles.wrapper}>{renderCategoryNavigation}</nav>;
};

export default CategoryNav;
