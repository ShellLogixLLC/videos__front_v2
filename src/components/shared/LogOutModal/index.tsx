import React, {useRef} from 'react';
// import classNames from 'classnames';

import {CloseIcon} from '~/assets';
import {Typography} from '~/components';
import Button from '~/components/shared/Button';
import {useLockBodyScroll, useOnClickOutside} from '~/hooks';
import {removeCookie} from '~/libraries';
import {RouterService} from '~/services';
import {Route} from '~/constants';

import {LogOutModalProps} from './types';
import styles from './LogOutModal.module.scss';

const LogOutModal: React.FC<LogOutModalProps> = ({show, close}) => {
  const handleLogoutSubmit = (): void => {
    removeCookie('token');
    RouterService.push(Route.Home);
    close();
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, close);

  useLockBodyScroll(show);

  return (
    <>
      {show ? (
        <div className={styles.modal}>
          <div ref={modalRef} className={styles.modal__container}>
            <CloseIcon
              className={styles.modal__container__close__icon}
              onClick={() => close()}
            />
            <div className={styles.modal__content}>
              <Typography tagName="h2" className={styles.modal__content__title}>
                Log Out?
              </Typography>
              <Typography
                tagName="span"
                className={styles.modal__content__text}>
                Are you sure you want to log out?
              </Typography>
              <div className={styles.modal__content__buttons}>
                <Button
                  className={styles.modal__content__buttons__cancel}
                  onClick={() => close()}>
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
      ) : (
        <></>
      )}
    </>
  );
};

export default LogOutModal;
