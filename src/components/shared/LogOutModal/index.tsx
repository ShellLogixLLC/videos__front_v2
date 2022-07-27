import React, {useRef} from 'react';

import {Route} from '~/constants';
import {CloseIcon} from '~/assets';
import {Typography} from '~/components';
import {removeCookie} from '~/libraries';
import {RouterService} from '~/services';
import Button from '~/components/shared/Button';
import {wishlistActions} from '~/store/wishlist';
import {useAppDispatch, useLockBodyScroll, useOnClickOutside} from '~/hooks';

import {LogOutModalProps} from './types';
import styles from './LogOutModal.module.scss';

const LogoutModal: React.FC<LogOutModalProps> = ({show, close}) => {
  const dispatch = useAppDispatch();

  const handleLogoutSubmit = (): void => {
    removeCookie('token');
    dispatch(wishlistActions.deleteVideoIds());
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
                logoutQuestion
              </Typography>
              <Typography
                tagName="span"
                className={styles.modal__content__text}>
                areYouSureYouWantLogout
              </Typography>
              <div className={styles.modal__content__buttons}>
                <Button
                  className={styles.modal__content__buttons__cancel}
                  onClick={() => close()}>
                  <Typography
                    className={styles.modal__content__buttons__cancel__title}
                    tagName="span">
                    cancel
                  </Typography>
                </Button>
                <Button
                  className={styles.modal__content__buttons__cancel}
                  onClick={handleLogoutSubmit}>
                  <Typography
                    className={styles.modal__content__buttons__cancel__title}
                    tagName="span">
                    logout
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

export default LogoutModal;
