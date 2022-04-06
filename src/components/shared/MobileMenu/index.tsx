import React, {useRef} from 'react';
import classNames from 'classnames';

import {Close} from '~/assets';
import {useOnClickOutside, useLockBodyScroll} from '~/hooks';

import styles from '../../layouts/Header/Header.module.scss';
import LanguageDropDown from '../LanguageDropDown';

import {IMobileMenuProps} from './types';

const MobileMenu: React.FC<IMobileMenuProps> = ({
  isOpen,
  children,
  setIsOpen,
}) => {
  const burgerContainerRef = useRef<HTMLDivElement | null>(null);

  const burgerClassNames = classNames(styles.wrapper__content__burger, {
    [styles.wrapper__content__burger_anima]: isOpen,
  });

  const handleCloseMenu = () => setIsOpen(false);

  useOnClickOutside(burgerContainerRef, handleCloseMenu);
  useLockBodyScroll(isOpen);

  return (
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
  );
};

export default MobileMenu;
