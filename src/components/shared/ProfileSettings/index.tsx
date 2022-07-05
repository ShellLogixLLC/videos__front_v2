import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {LogoutModal, ProfileModal, Typography} from '~/components';
import {BottomArrow, ExitIcon, UserIcon} from '~/assets';
import {useAppSelector, useOnClickOutside} from '~/hooks';
import {authSelect} from '~/store/auth';

import {ProfileSettingsProps} from './types';
import styles from './ProfileSettings.module.scss';

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const {userInfo} = useAppSelector(authSelect);

  const realUserName =
    userInfo && userInfo.username.length > 10
      ? userInfo.username.slice(0, 10)
      : userInfo && userInfo.username;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeModal = (): void => {
    setShowLogoutModal(false);
  };

  const openLogoutModal = (): void => {
    setShowLogoutModal(!showLogoutModal);
    setDropdownOpen(false);
  };

  const openProfileModal = (): void => {
    setShowProfileModal(!showProfileModal);
    setDropdownOpen(false);
  };

  const closeDropdown = (): void => {
    setDropdownOpen(false);
  };

  const wrapperClassName = classNames(styles.wrapper, {
    [styles.wrapper__open]: isDropdownOpen,
  });

  const containerClassName = classNames(styles.container, {
    [styles.container__open]: isDropdownOpen,
  });

  const arrowIconClassName = classNames(styles.container__arrowIcon, {
    [styles.container__arrowIcon__active]: isDropdownOpen,
  });

  const userIconClassName = classNames(styles.container__userIcon, {
    [styles.container__userIcon__open]: isDropdownOpen,
  });

  const logOutIconClassName = classNames(
    styles.content__list__icon,
    styles.content__list__icon__exit,
  );

  const dropdownClassName = classNames(styles.content, {
    [styles.content__open]: isDropdownOpen,
  });

  const linkClassName = classNames(styles.content__list__link);

  useOnClickOutside(dropdownRef, closeDropdown);

  return (
    <div
      role="button"
      onClick={handleDropdownClick}
      className={wrapperClassName}>
      <div ref={dropdownRef} className={containerClassName}>
        <UserIcon className={userIconClassName} />
        <Typography tagName="span" className={styles.container__user}>
          {realUserName}
        </Typography>
        <BottomArrow className={arrowIconClassName} />
        <div className={dropdownClassName}>
          <ul className={styles.content__list}>
            <div
              role="button"
              onClick={openProfileModal}
              className={styles.content__list__wrapper}>
              <UserIcon className={styles.content__list__icon} />
              <li className={linkClassName}>User Info</li>
            </div>
            <div
              role="button"
              onClick={openLogoutModal}
              className={styles.content__list__wrapper}>
              <ExitIcon className={logOutIconClassName} />
              <li className={linkClassName}>Log Out</li>
            </div>
          </ul>
        </div>
      </div>
      <LogoutModal close={closeModal} show={showLogoutModal} />
      <ProfileModal
        expanded={showProfileModal}
        setExpanded={setShowProfileModal}
      />
    </div>
  );
};

export default ProfileSettings;
