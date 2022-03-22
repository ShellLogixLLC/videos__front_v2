import React, {useRef} from 'react';
import classNames from 'classnames';

import {Menu, Close} from '~/assets';
import {useOnClickOutside} from '~/hooks';

import styles from '../../layouts/Header/Header.module.scss';
import Button from '../Button';
import Search from '../Search';
import LanguageDropDown from '../LanguageDropDown';

import {IHeaderBurgerProps} from './types';

const HeaderBurger: React.FC<IHeaderBurgerProps> = ({
  isOpen,
  children,
  expanded,
  setIsOpen,
  toggleExpanded,
}) => {
  const burgerContainerRef = useRef<HTMLDivElement | null>(null);

  const burgerClassNames = classNames(styles.wrapper__content__burger, {
    [styles.wrapper__content__burger_anima]: isOpen,
  });

  const handleOpenMenu = () => setIsOpen(true);

  const handleCloseMenu = () => setIsOpen(false);

  useOnClickOutside(burgerContainerRef, handleCloseMenu);

  return (
    <>
      <div className={styles.wrapper__content__container}>
        <Search toggleExpanded={toggleExpanded} expanded={expanded} />
        <Button
          onClick={handleOpenMenu}
          className={styles.wrapper__content__burger_icon}>
          <Menu className={styles.wrapper__content__close__icon} />
        </Button>
      </div>
      <div className={burgerClassNames}>
        <Close
          onClick={handleCloseMenu}
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
