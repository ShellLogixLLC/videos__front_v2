import React, {useRef} from 'react';
import classNames from 'classnames';

import {CloseIcon} from '~/assets';
import {Typography} from '~/components';
import Button from '~/components/shared/Button';
import {useLockBodyScroll, useOnClickOutside} from '~/hooks';

import {LogOutModalProps} from './types';
import styles from './LogOutModal.module.scss';

const LogOutModal: React.FC<LogOutModalProps> = ({
  show,
  setShow,
  close,
  setClose,
}) => {
  const handleLogoutSubmit = (): void => {
    console.log('submit logout');
  };

  const handleCloseModal = (): void => {
    console.log('close modal');
  };

  const handleCancelLogout = (): void => {
    console.log('cancel closing');
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, handleCloseModal);

  useLockBodyScroll(show);

  return (
    <div className={styles.modal}>
      <div ref={modalRef} className={styles.modal__container}>
        <CloseIcon
          className={styles.modal__container__close__icon}
          onClick={handleCloseModal}
        />
        <div className={styles.modal__content}>
          <Typography tagName="h2" className={styles.modal__content__text}>
            Are You sure You want to Log Out?
          </Typography>
          <div className={styles.modal__content__buttons}>
            <Button
              className={styles.modal__content__buttons__cancel}
              onClick={handleCancelLogout}>
              <Typography
                className={styles.modal__content__buttons__cancel__title}
                tagName="span">
                Cancel
              </Typography>
            </Button>
            <Button
              className={styles.modal__content__buttons__cancel}
              onClick={handleLogoutSubmit}>
              <Typography
                className={styles.modal__content__buttons__cancel__title}
                tagName="span">
                Log Out
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
