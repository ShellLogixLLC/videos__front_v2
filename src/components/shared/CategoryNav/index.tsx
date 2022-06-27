import React, {useState} from 'react';
import classNames from 'classnames';

import {categoryNavigation} from '~/utils/index';

import Button from '../Button';
import Typography from '../Typography';

import styles from './CategoryNav.module.scss';

const CategoryNav: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const buttonClasses = (id: number) =>
    classNames(styles.wrapper__buttons, {
      [styles.wrapper__buttons__active]: activeCategory === id,
    });

  const chooseCategory = (idx: number) => {
    setActiveCategory(idx);
  };

  const renderCategoryNavigation = categoryNavigation.map(
    ({nameCategory, id}, idx) => (
      <Button
        key={id}
        onClick={() => chooseCategory(idx)}
        className={buttonClasses(id)}>
        <Typography>{nameCategory}</Typography>
      </Button>
    ),
  );

  return <nav className={styles.wrapper}>{renderCategoryNavigation}</nav>;
};

export default CategoryNav;
