import React, {useMemo, useRef} from 'react';
import {useToggle} from 'react-use';
import classNames from 'classnames';

import {FilterLamp} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Link from '../Link';
import Typography from '../Typography';

import {IFilterBySortProps} from './types';
import styles from './FilterBySort.module.scss';

const FilterBySort: React.FC<IFilterBySortProps> = ({options}) => {
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [expanded, toggleExpanded] = useToggle(false);

  const containerClasses = classNames(styles.container, {
    [styles.container__expand]: expanded,
  });

  const innerClasses = classNames(styles.container__content__child, {
    [styles.container__content__child__animation]: expanded,
  });

  useOnClickOutside(filterRef, () => {
    toggleExpanded(false);
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
    <div ref={filterRef} onClick={toggleExpanded} className={containerClasses}>
      <div className={styles.container__header}>
        <Typography className={styles.container__header__title}>
          Sort by
        </Typography>
        <FilterLamp className={styles.container__header__icon} />
      </div>
      <div className={styles.container__content}>
        <div className={innerClasses}>{renderFilteredTable}</div>
      </div>
    </div>
  );
};

export default FilterBySort;
