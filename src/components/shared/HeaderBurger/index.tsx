import React, {useRef} from 'react';
import classNames from 'classnames';

import {Menu, Close} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import Button from '../Button';
import Search from '../Search';
import LanguageDropDown from '../LanguageDropDown';

import styles from '../../layouts/Header/Header.module.scss';

import {HeaderBurgerProps} from './types';

const HeaderBurger: React.FC<HeaderBurgerProps> = ({
  isOpen,
  children,
  setIsOpen,
}) => {
  const burgerContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(burgerContainerRef, () => setIsOpen(false));

  const burgerClassNames = classNames(styles.wrapper__content__burger, {
    [styles.wrapper__content__burger_anima]: isOpen,
  });

  const toggleHandler = (boolean: boolean) => {
    return () => {
      setIsOpen(boolean);
    };
  };

  return (
    <>
      <div className={styles.wrapper__content__container}>
        <Search />
        <Button
          onClick={toggleHandler(true)}
          className={styles.wrapper__content__burger_icon}>
          <Menu />
        </Button>
      </div>
      <div className={burgerClassNames}>
        <Close
          onClick={toggleHandler(false)}
          className={styles.wrapper__content__close_icon}
        />
        <div
          ref={burgerContainerRef}
          className={styles.wrapper__content__burger__container}>
          <div className={styles.wrapper__content__burger__container__nav}>
            {children}
          </div>
          <LanguageDropDown />
        </div>
      </div>
    </>
  );
};

export default HeaderBurger;
