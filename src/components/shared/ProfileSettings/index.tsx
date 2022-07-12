import React, {useRef, useState} from 'react';
import classNames from 'classnames';
import Tooltip from 'react-tooltip-lite';

import {LogoutModal, ProfileModal, Typography} from '~/components';
import {ExitIcon, UnverifiedIcon, UserIcon, VerifiedIcon} from '~/assets';
import {useAppSelector, useOnClickOutside} from '~/hooks';
import {authSelect} from '~/store/auth';

import styles from './ProfileSettings.module.scss';

const ProfileSettings: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const {userInfo} = useAppSelector(authSelect);

  const isVerified = userInfo && userInfo.isVerified;

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
              <li className={linkClassName}>User Info</li>
              <Tooltip
                content={
                  isVerified ? (
                    <div className={styles.content__tooltip}>
                      <VerifiedIcon className={styles.content__tooltip__icon} />
                      <Typography className={styles.content__tooltip__title}>
                        verified
                      </Typography>
                    </div>
                  ) : (
                    <div className={styles.content__tooltip}>
                      <UnverifiedIcon
                        className={styles.content__tooltip__icon}
                      />
                      <Typography className={styles.content__tooltip__title}>
                        unverified
                      </Typography>
                    </div>
                  )
                }
                direction="left"
                background="#fff"
                hoverDelay={100}
                mouseOutDelay={100}
                tipContentClassName={styles.content__tooltip__lite}
                tipContentHover={true}
                arrow={true}
                forceDirection={true}>
                <UserIcon className={styles.content__list__icon} />
              </Tooltip>
            </div>
            <div
              role="button"
              onClick={openLogoutModal}
              className={styles.content__list__wrapper}>
              <li className={linkClassName}>Log Out</li>
              <ExitIcon className={logOutIconClassName} />
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
