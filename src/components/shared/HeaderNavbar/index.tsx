import React from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {LikeIt, UserIcon} from '~/assets';

import {HeaderNavbarProps} from './HeaderNavbarProps';

import Link from '../Link';
import Search from '../Search';
import LanguageDropDown from '../LanguageDropDown';

import styles from '../../layouts/Header/Header.module.scss';

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  children,
  expanded,
  setExpanded,
}) => {
  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <div className={styles.wrapper__content__other}>
        <Search setExpanded={setExpanded} expanded={expanded} />
        <div className={styles.wrapper__content__other__skeleton} />
        <Link to={Route.MyFavorite}>
          <LikeIt className={styles.wrapper__content__other__wishlist} />
        </Link>
        <Link to="/sign-in" className={styles.wrapper__content__other__sign_in}>
          <UserIcon />
        </Link>
        <LanguageDropDown />
      </div>
    </>
  );
};
export default HeaderNavbar;
