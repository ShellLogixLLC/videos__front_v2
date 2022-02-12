import React from 'react';

import {Menu} from '~/assets';

import Button from '../Button';
import LanguageDropDown from '../LanguageDropDown';
import Search from '../Search';
//
import styles from '../../layouts/Header/Header.module.scss';

import {HeaderBurgerProps} from './types';

const HeaderBurger: React.FC<HeaderBurgerProps> = ({
  isOpen,
  children,
  closeHandler,
}) => (
  <>
    {/* <Button onClick={closeHandler} className={styles.wrapper__content__close}>
      <Menu className={styles.wrapper__content__close__icon} />
    </Button> */}
    <div className={styles.wrapper__content__container}>
      <Search />
      <Button onClick={closeHandler} className={styles.wrapper__content__close}>
        <Menu className={styles.wrapper__content__close__icon} />
      </Button>
    </div>
    <div
      style={{
        transform: `scaleX(${isOpen ? 0 : 1})`,
        backdropFilter: `blur(${isOpen ? 0 : 2}px)`,
      }}
      className={styles.wrapper__content__burger}>
      <div className={styles.wrapper__content__burger__container}>
        <div className={styles.wrapper__content__burger__container__nav}>
          {children}
        </div>
        <LanguageDropDown />
      </div>
    </div>
  </>
);

export default HeaderBurger;
