import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {useOnClickOutside} from '~/hooks';
import {
  Typography,
  LogoutModal,
  ProfileModal,
  LanguageDropDown,
} from '~/components';
import {ExitIcon, UserIcon} from '~/assets';

import styles from './ProfileSettings.module.scss';

const ProfileSettings: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = (e: React.MouseEvent): void => {
    if (wrapperRef?.current?.contains(e.target as Node)) {
      return;
    }
    setDropdownOpen(!isDropdownOpen);
  };

  const closeModal = (): void => {
    setShowLogoutModal(false);
  };

  const openLogoutModal = (): void => {
    setDropdownOpen(false);
    setShowLogoutModal(!showLogoutModal);
  };

  const openProfileModal = (): void => {
    setDropdownOpen(false);
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
        <div className={dropdownClassName}>
          <ul className={styles.content__list}>
            <div
              role="button"
              onClick={openProfileModal}
              className={styles.content__list__wrapper}>
              <li className={linkClassName}>
                <Typography className={styles.content__list__wrapper__typo}>
                  userInfo
                </Typography>
              </li>
              <div className={styles.content__list__icon__wrapper}>
                <UserIcon className={styles.content__list__icon} />
              </div>
            </div>
            <div className={styles.content__list__wrapper}>
              <li className={linkClassName}>
                <Typography className={styles.content__list__wrapper__typo}>
                  language
                </Typography>
              </li>
              <LanguageDropDown />
            </div>
            <div className={styles.content__list__wrapper}>
              <li
                role="button"
                onClick={openLogoutModal}
                className={linkClassName}>
                <Typography className={styles.content__list__wrapper__typo}>
                  logout
                </Typography>
              </li>
              <ExitIcon
                role="button"
                onClick={openLogoutModal}
                className={logOutIconClassName}
              />
            </div>
          </ul>
        </div>
      </div>
      <LogoutModal close={closeModal} show={showLogoutModal} />
      <ProfileModal
        ref={wrapperRef}
        expanded={showProfileModal}
        setExpanded={setShowProfileModal}
      />
    </div>
  );
};

export default ProfileSettings;
