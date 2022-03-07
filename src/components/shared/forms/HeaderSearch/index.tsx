import React from 'react';

import {SearchIcon} from '~/assets';

import styles from './HeaderSearchForm.module.scss';

const HeaderSearchForm: React.FC = () => {
  return (
    <div className={styles.search}>
      <SearchIcon />
    </div>
  );
};

export default HeaderSearchForm;
