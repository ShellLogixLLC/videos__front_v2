import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {CloseIcon} from '~/assets';
import {getCookieFromBrowser} from '~/libraries';
import {useOnClickOutside, useLockBodyScroll} from '~/hooks';
import {MobileAuth, ProfileModal, Typography} from '~/components';

import styles from '../../layouts/Header/Header.module.scss';
import LanguageDropDown from '../LanguageDropDown';

import {IMobileMenuProps} from './types';

const MobileMenu: React.FC<IMobileMenuProps> = ({
  isOpen,
  children,
  setIsOpen,
}) => {
  const burgerContainerRef = useRef<HTMLDivElement | null>(null);

  const [isProfileSettingsOpen, setProfileSettingsOpen] =
    useState<boolean>(false);

  const burgerClassNames = classNames(styles.wrapper__content__burger, {
    [styles.wrapper__content__burger_anima]: isOpen,
  });

  const handleCloseMenu = () => setIsOpen(false);

  const openProfileSettings = (): void => {
    setProfileSettingsOpen(!isProfileSettingsOpen);
  };

  const token = getCookieFromBrowser('token');

  const renderProfileSettings = token && (
    <div
      role="button"
      onClick={openProfileSettings}
      className={styles.wrapper__content__userSettings}>
      <Typography className={styles.wrapper__content__userSettings__typo}>
        profileSettings
      </Typography>
    </div>
  );

  useOnClickOutside(burgerContainerRef, handleCloseMenu);
  useLockBodyScroll(isOpen);

  return (
    <div className={burgerClassNames}>
      <CloseIcon
        onClick={handleCloseMenu}
        className={styles.wrapper__content__close_icon}
      />
      <div
        ref={burgerContainerRef}
        className={styles.wrapper__content__burger__container}>
        <div className={styles.wrapper__content__burger__container__nav}>
          {children}
          {renderProfileSettings}
        </div>
        <LanguageDropDown />
        <div className={styles.wrapper__content__absolute}>
          <MobileAuth />
        </div>
      </div>
      <ProfileModal
        expanded={isProfileSettingsOpen}
        setExpanded={setProfileSettingsOpen}
      />
    </div>
  );
};

export default MobileMenu;
