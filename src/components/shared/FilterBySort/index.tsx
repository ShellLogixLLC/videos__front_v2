import React, {useMemo} from 'react';
import {useToggle} from 'react-use';
import classNames from 'classnames';

import {FilterLampIcon} from '~/assets';

import Link from '../Link';
import Typography from '../Typography';

import {IFilterBySortProps} from './types';
import styles from './FilterBySort.module.scss';

const FilterBySort: React.FC<IFilterBySortProps> = ({options}) => {
  const [expanded, toggleExpanded] = useToggle(false);

  const containerClasses = classNames(styles.container, {
    [styles.container__expand]: expanded,
  });

  const innerClasses = classNames(styles.container__content__child, {
    [styles.container__content__child__animation]: expanded,
  });

  const renderFilteredTable = useMemo(
    () =>
      options.map(({routes, nameRoute, id}) => {
        return routes ? (
          <Link key={id} to={routes} className={styles.container__content__box}>
            {nameRoute}
          </Link>
        ) : (
          <Typography key={id} className={styles.container__content__box}>
            {nameRoute}
          </Typography>
        );
      }),
    [options],
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
