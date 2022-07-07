import React from 'react';
import classNames from 'classnames';

import {CloseIcon} from '~/assets';
import {filteredMass} from '~/utils';
import {useLockBodyScroll} from '~/hooks';
import {Button, Typography} from '~/components';

import DatePicker from '../DatePicker';
import FilterBySort from '../FilterBySort';

import {IMobileFilterProps} from './types';
import styles from './MobileFilter.module.scss';

const MobileFilter: React.FC<IMobileFilterProps> = ({
  isFilter,
  toggleFilter,
}) => {
  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper_open]: isFilter,
  });

  useLockBodyScroll(isFilter);

  return (
    <div className={wrapperClasses}>
      <div className={styles.wrapper__top_block}>
        <Typography className={styles.wrapper__top_block__text}>
          Filter
        </Typography>
        <CloseIcon onClick={toggleFilter} className={styles.wrapper__close} />
      </div>
      <div className={styles.wrapper__content}>
        <DatePicker />
        <FilterBySort options={filteredMass} />
        <Button className={styles.wrapper__content__btn}>Filter</Button>
      </div>
    </div>
  );
};

export default MobileFilter;
