import React from 'react';
import classNames from 'classnames';

import {CloseIcon} from '~/assets';
import {useLockBodyScroll} from '~/hooks';
import {categoryNavigation} from '~/utils';
import {Button, Typography} from '~/components';

import DatePicker from '../DatePicker';
import FilterBySort from '../FilterBySort';

import {IMobileFilterProps} from './types';
import styles from './MobileFilter.module.scss';

const MobileFilter: React.FC<IMobileFilterProps> = ({
  isFilter,
  toggleFilter,
  isNotActive,
}) => {
  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper_open]: isFilter,
    [styles.wrapper_unactive]: isNotActive,
  });

  useLockBodyScroll(isFilter);

  return (
    <div className={wrapperClasses}>
      <div className={styles.wrapper__top_block}>
        <Typography className={styles.wrapper__top_block__text}>
          filter
        </Typography>
        <CloseIcon onClick={toggleFilter} className={styles.wrapper__close} />
      </div>
      <div className={styles.wrapper__content}>
        <DatePicker />
        <FilterBySort options={categoryNavigation} />
        <Button onClick={toggleFilter} className={styles.wrapper__content__btn}>
          <Typography tagName="span">filter</Typography>
        </Button>
      </div>
    </div>
  );
};

export default MobileFilter;
