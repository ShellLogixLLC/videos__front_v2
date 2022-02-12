import React from 'react';

import {Route} from '~/constants';
import {LikeIt, UserIcon} from '~/assets';

import Link from '../Link';
import Search from '../Search';
import LanguageDropDown from '../LanguageDropDown';
//
import styles from '../../layouts/Header/Header.module.scss';

const HeaderNavbar: React.FC = ({children}) => (
  <>
    <nav className={styles.wrapper__content_menu}>{children}</nav>
    <div className={styles.wrapper__content__other}>
      <Search />
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
export default HeaderNavbar;
