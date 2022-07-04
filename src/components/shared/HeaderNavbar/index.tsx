import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {ToggleContext} from '~/context';
import {getCookieFromBrowser} from '~/libraries';
import {LikeIt, UserIcon} from '~/assets';
import {ProfileSettings} from '~/components';

import Link from '../Link';
import LanguageDropDown from '../LanguageDropDown';
import styles from '../../layouts/Header/Header.module.scss';

const HeaderNavbar: React.FC = ({children}) => {
  const token = getCookieFromBrowser('token');

  const {expanded} = useContext(ToggleContext);

  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  // const handleUserModal = () => {
  //   setIsOpenModal(true);
  //
  //   if (!userInfo) {
  //     dispatch(authActions.loginWithToken({token: token as string}));
  //   }
  // };

  const renderUserIcons = !token ? (
    <Link to={Route.SignIn} className={styles.wrapper__content__other__sign_in}>
      <UserIcon />
    </Link>
  ) : (
    <ProfileSettings />
  );

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <div className={styles.wrapper__content__other}>
        <div className={styles.wrapper__content__other__skeleton} />
        <Link
          className={styles.wrapper__content__other__link}
          to={Route.MyFavorite}>
          <LikeIt className={styles.wrapper__content__other__wishlist} />
        </Link>
        {renderUserIcons}
        <LanguageDropDown />
      </div>
    </>
  );
};
export default HeaderNavbar;
