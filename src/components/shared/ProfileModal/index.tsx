import React, {useRef} from 'react';
import usePortal from 'react-useportal';
import classNames from 'classnames';

import {authSelect} from '~/store/auth';
import {Alla, Close, RoundAllow} from '~/assets';
import {useAppSelector, useLockBodyScroll, useOnClickOutside} from '~/hooks';
import {Typography} from '~/components';

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
              <Alla />
              <Typography
                tagName="h2"
                className={styles.wrapper__content__title}>
                Hello {userInfo?.username}
              </Typography>
            </div>
            <div className={styles.wrapper__content__block}>
              <Typography
                tagName="p"
                className={styles.wrapper__content__block__text}>
                Email <span>{userInfo?.email}</span>
              </Typography>
            </div>
            {userInfo?.isVerified && (
              <RoundAllow className={styles.wrapper__content__icon} />
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ProfileModal;
