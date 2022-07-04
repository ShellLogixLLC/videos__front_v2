import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {LogoutModal, Typography} from '~/components';
import {BottomArrow, UserIcon} from '~/assets';
import {useAppSelector, useOnClickOutside} from '~/hooks';
import {authSelect} from '~/store/auth';

import {ProfileSettingsProps} from './types';
import styles from './ProfileSettings.module.scss';

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {userInfo} = useAppSelector(authSelect);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const openModal = (): void => {
    setShowModal(!showModal);
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
          <ul>
            <li>Some Link</li>
            <li role="button" onClick={openModal}>
              Log Out
            </li>
          </ul>
        </div>
      </div>
      <LogoutModal close={closeModal} show={showModal} />
    </div>
  );
};

export default ProfileSettings;
