import React from 'react';

import {Route} from '~/constants';
import {SearchIcon, LikeIt} from '~/assets';

import Link from '../Link';
import Input from '../Input';
import LanguageDropDown from '../LanguageDropDown';
import styles from '../../layouts/Header/Header.module.scss';

const Navbar: React.FC = ({children}) => (
  <>
    <nav className={styles.wrapper__content_menu}>{children}</nav>
    <div className={styles.wrapper__content__other}>
      <Input
        type="text"
        name="globalSearch"
        placeholder="Search"
        RightIcon={SearchIcon}
        className={styles.wrapper__content__other__search}
        rightIconStyle={styles.wrapper__content__other__right_icon}
      />
      <Link to={Route.MyFavorite}>
        <LikeIt className={styles.wrapper__content__other__wishlist} />
      </Link>
      <LanguageDropDown />
    </div>
  </>
);

export default Navbar;
