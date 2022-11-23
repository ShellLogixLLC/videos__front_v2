import React, {useMemo, useState} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useRouter} from 'next/router';

import {FilterLampIcon} from '~/assets';
import {CategoryFilters} from '~/constants';
import {chooseCategorySort} from '~/utils';

import Link from '../Link';
import Typography from '../Typography';

import {IFilterBySortProps} from './types';
import styles from './FilterBySort.module.scss';

const FilterBySort: React.FC<IFilterBySortProps> = ({options}) => {
  const {query} = useRouter();

  const [expanded, toggleExpanded] = useToggle(false);
  const [activeCategory, setActiveCategory] = useState<string | string[]>(
    query?.activeCategory || CategoryFilters.All,
  );

  const containerClasses = classNames(styles.container, {
    [styles.container__expand]: expanded,
  });

  const innerClasses = classNames(styles.container__content__child, {
    [styles.container__content__child__animation]: expanded,
  });

  const renderFilteredTable = useMemo(
    () =>
      options.map(({routes, nameCategory, id}) => {
        return routes ? (
          <Link key={id} to={routes} className={styles.container__content__box}>
            {nameCategory}
          </Link>
        ) : (
          <Typography
            key={id}
            onClick={() =>
              chooseCategorySort(
                nameCategory,
                query,
                activeCategory,
                setActiveCategory,
              )
            }
            className={styles.container__content__box}>
            {nameCategory}
          </Typography>
        );
      }),
    [options, query, activeCategory],
  );

  return (
    <div onClick={toggleExpanded} className={containerClasses}>
      <div className={styles.container__header}>
        <Typography className={styles.container__header__title}>
          sortBy
        </Typography>
        <FilterLampIcon className={styles.container__header__icon} />
      </div>
      <div className={styles.container__content}>
        <div className={innerClasses}>{renderFilteredTable}</div>
      </div>
    </div>
  );
};

export default FilterBySort;
