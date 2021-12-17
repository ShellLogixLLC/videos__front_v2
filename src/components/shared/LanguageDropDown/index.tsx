import React from 'react';

import {LanguageArrowBottom} from '~/assets';

import Button from '../Button';

import styles from './LanguageDropDown.module.scss';

const LanguageDropDown: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.wrapper__header}>
        <span className={styles.wrapper__header__language}>Eng</span>
        <LanguageArrowBottom className={styles.wrapper__header_arrow} />
      </Button>
      {/* <div className={styles.wrapper__content}>My COntent</div> */}
    </div>
  );
};

export default LanguageDropDown;
