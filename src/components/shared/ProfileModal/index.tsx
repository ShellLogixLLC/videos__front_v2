import React, {useRef} from 'react';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import {authSelect} from '~/store/auth';
import {AllaIcon, Close, RoundAllowIcon} from '~/assets';
import {useAppSelector, useLockBodyScroll, useOnClickOutside} from '~/hooks';

import {ProfileModalProps} from './types';
import styles from './ProfileModal.module.scss';

// This page isn't finished, it doesn't have design

const ProfileModal: React.FC<ProfileModalProps> = ({expanded, setExpanded}) => {
  const {Portal} = usePortal();
  const {userInfo} = useAppSelector(authSelect);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__open]: expanded,
  });

  const handleClose = () => setExpanded(false);

  useOnClickOutside(modalRef, handleClose);

  useLockBodyScroll(expanded);

  return (
    <Portal>
      <div className={wrapperClasses}>
        <div ref={modalRef} className={styles.wrapper__content}>
          <Close
            className={styles.wrapper__content__close_icon}
            onClick={handleClose}
          />
          <div className={styles.wrapper__content__child}>
            <div className={styles.wrapper__content__block}>
              <AllaIcon />
              <h2 className={styles.wrapper__content__title}>
                Hello {userInfo?.username}
              </h2>
            </div>
            <div className={styles.wrapper__content__block}>
              <p className={styles.wrapper__content__block__text}>
                Email <span>{userInfo?.email}</span>
              </p>
            </div>
            {userInfo?.isVerified && (
              <RoundAllowIcon className={styles.wrapper__content__icon} />
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ProfileModal;
