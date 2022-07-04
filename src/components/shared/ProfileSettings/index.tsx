import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {LogoutModal, ProfileModal, Typography} from '~/components';
import {BottomArrow, UserIcon} from '~/assets';
import {useAppSelector, useOnClickOutside} from '~/hooks';
import {authSelect} from '~/store/auth';

import {ProfileSettingsProps} from './types';
import styles from './ProfileSettings.module.scss';

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const {userInfo} = useAppSelector(authSelect);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeModal = (): void => {
    setShowLogoutModal(false);
  };

  const openLogoutModal = (): void => {
    setShowLogoutModal(!showLogoutModal);
  };

  const openProfileModal = (): void => {
    setShowProfileModal(!showProfileModal);
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

  const dropdownClassName = classNames(styles.content, {
    [styles.content__open]: isDropdownOpen,
  });

  useOnClickOutside(dropdownRef, closeDropdown);

  return (
    <div className={wrapperClassName}>
      <div
        role="button"
        onClick={handleDropdownClick}
        className={containerClassName}>
        <UserIcon className={styles.container__userIcon} />
        <Typography tagName="span" className={styles.container__user}>
          {userInfo ? userInfo.username && userInfo.username : ''}
        </Typography>
        <BottomArrow clasName={arrowIconClassName} />
        <div ref={dropdownRef} className={dropdownClassName}>
          <ul className={styles.content__list}>
            <li
              role="button"
              onClick={openProfileModal}
              className={styles.content__list__link}>
              User Info
            </li>
            <li
              role="button"
              onClick={openLogoutModal}
              className={styles.content__list__link}>
              Log Out
            </li>
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
