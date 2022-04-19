import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {ToggleContext} from '~/context';
import {getCookieFromBrowser} from '~/libraries';
import {authActions, authSelect} from '~/store/auth';
import {LikeIt, UserIcon, UserRound} from '~/assets';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Link from '../Link';
import ProfileModal from '../ProfileModal';
import LanguageDropDown from '../LanguageDropDown';
import styles from '../../layouts/Header/Header.module.scss';

const HeaderNavbar: React.FC = ({children}) => {
  const dispatch = useAppDispatch();
  const token = getCookieFromBrowser('token');
  const {userInfo} = useAppSelector(authSelect);
  const {expanded} = useContext(ToggleContext);

  const [isUserModal, setIsUserModal] = useState<boolean>(false);

  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  const handleUserModal = () => {
    setIsUserModal(true);
    if (!userInfo) {
      dispatch(authActions.loginWithToken({token: token as string}));
    }
  };

  const renderUserIcons = !token ? (
    <Link to="/sign-in" className={styles.wrapper__content__other__sign_in}>
      <UserIcon />
    </Link>
  ) : (
    <UserRound
      className={styles.wrapper__content__user_icon}
      onClick={handleUserModal}
    />
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
      <ProfileModal expanded={isUserModal} setExpanded={setIsUserModal} />
    </>
  );
};
export default HeaderNavbar;
