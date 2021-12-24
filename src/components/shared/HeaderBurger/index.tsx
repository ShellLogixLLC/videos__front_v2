import React from 'react';

import {CloseIcon} from '~/assets';

import {HeaderBurgerProps} from './types';

const Burger: React.FC<HeaderBurgerProps> = ({styles, headerBurger}) => {
  return (
    <div className={styles.wrapper__content__burger}>
      <div className={styles.wrapper__content__burger__close}>
        <CloseIcon className={styles.wrapper__content__burger__close__icon} />
      </div>
      <div className={styles.wrapper__content__burger__nav}>{headerBurger}</div>
    </div>
  );
};

export default Burger;
