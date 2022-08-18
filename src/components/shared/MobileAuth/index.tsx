import React, {useState} from 'react';

import {Route} from '~/constants';
import {LogoutIcon} from '~/assets';
import {getCookieFromBrowser} from '~/libraries';
import {Link, LogoutModal, Typography} from '~/components';

import styles from './MobileAuth.module.scss';

const MobileAuth: React.FC = () => {
  const token = getCookieFromBrowser('token');

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const closeLogOutModal = (): void => {
    setShowLogoutModal(false);
  };

  const openLogoutModal = (): void => {
    setShowLogoutModal(!showLogoutModal);
  };

  const renderMobileSignin = (
    <div className={styles.wrapper__withToken}>
      <Link to={Route.SignIn} className={styles.wrapper__withToken__signin}>
        <Typography className={styles.wrapper__withToken__signin__typo}>
          signin
        </Typography>
      </Link>
      <Link
        to={Route.RegistrationPersonalInformation}
        className={styles.wrapper__withToken__register}>
        <Typography className={styles.wrapper__withToken__register__typo}>
          register
        </Typography>
      </Link>
    </div>
  );

  const renderMobileLogout = (
    <div className={styles.wrapper__withoutToken}>
      <div
        className={styles.wrapper__withoutToken__container}
        role="button"
        onClick={openLogoutModal}>
        <Typography className={styles.wrapper__withoutToken__container__typo}>
          logout
        </Typography>
        <LogoutIcon className={styles.wrapper__withoutToken__container__icon} />
      </div>
    </div>
  );

  const renderMobileAuthcomponent = !token
    ? renderMobileSignin
    : renderMobileLogout;

  return (
    <div className={styles.wrapper}>
      {renderMobileAuthcomponent}
      <LogoutModal close={closeLogOutModal} show={showLogoutModal} />
    </div>
  );
};

export default MobileAuth;
