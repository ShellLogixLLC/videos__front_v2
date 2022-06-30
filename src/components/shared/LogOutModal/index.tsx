import React from 'react';

import {CloseIcon} from '~/assets';
import {Typography} from '~/components';
import Button from '~/components/shared/Button';

import {LogOutModalProps} from './types';
import styles from './LogOutModal.module.scss';

const LogOutModal: React.FC<LogOutModalProps> = ({
  show,
  setShow,
  close,
  setClose,
}) => {
  const handleLogoutSubmit = () => {
    console.log('submit logout');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        <CloseIcon />
        <div className={styles.modal__content}>
          <Typography tagName="h2" className={styles.modal__content__text}>
            Are You sure You want to Log Out?
          </Typography>
          <Button
            className={styles.modal__content__text__button}
            onClick={handleLogoutSubmit}>
            <Typography
              className={styles.modal__content__text__button__submit}
              tagName="span">
              Log Out
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
