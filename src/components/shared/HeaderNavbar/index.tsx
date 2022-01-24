import React from 'react';

import {Route} from '~/constants';
import {LikeIt} from '~/assets';

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
      <Link to={Route.MyFavorite}>
        <LikeIt className={styles.wrapper__content__other__wishlist} />
      </Link>
      <LanguageDropDown />
    </div>
  </>
);
export default HeaderNavbar;
