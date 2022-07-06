import React, {useContext} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {ToggleContext} from '~/context';
import {getCookieFromBrowser} from '~/libraries';
import {LikeItIcon, UserIcon} from '~/assets';
import {ProfileSettings, Search, SigninDropdown} from '~/components';

import Link from '../Link';
import LanguageDropDown from '../LanguageDropDown';
import styles from '../../layouts/Header/Header.module.scss';

import {HeaderNavbarProps} from './types';

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({children}) => {
  const token = getCookieFromBrowser('token');

  const {expanded} = useContext(ToggleContext);

  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  const wrapperClassName = classNames(styles.wrapper__content__other, {
    [styles.wrapper__content__other__withToken]: token,
  });

  const renderUserIcons = !token ? <SigninDropdown /> : <ProfileSettings />;

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <Search />
      <div className={wrapperClassName}>
        <div className={styles.wrapper__content__other__skeleton} />
        <Link
          className={styles.wrapper__content__other__link}
          to={Route.MyFavorite}>
          <LikeItIcon className={styles.wrapper__content__other__wishlist} />
        </Link>
        {renderUserIcons}
        <LanguageDropDown />
      </div>
    </>
  );
};
export default HeaderNavbar;
