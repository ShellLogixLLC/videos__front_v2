import React from 'react';

import {AlarmIcon} from '~/assets';
import {filteredMass} from '~/utils';
import {MobileFilterIcon} from '~/assets';

import Filter from '../Filter';
import DatePicker from '../DatePicker';
import CategoryNav from '../CategoryNav';

import styles from './MobileFilter.module.scss';

const MobileFilter: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <MobileFilterIcon className={styles.wrapper__icon} />
      <div className={styles.wrapper__content}>
        <DatePicker />
        <CategoryNav />
        <Filter
          filterTitle="FILTER"
          IconProp={AlarmIcon}
          options={filteredMass}
        />
      </div>
    </div>
  );
};

export default MobileFilter;
