import React, {useState} from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';

import {categoryNavigation} from '~/utils/index';

import Button from '../Button';

import styles from './CategoryNav.module.scss';

const CategoryNav: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const {t} = useTranslation('common');

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
        {t(nameCategory)}
      </Button>
    ),
  );

  return <nav className={styles.wrapper}>{renderCategoryNavigation}</nav>;
};

export default CategoryNav;
