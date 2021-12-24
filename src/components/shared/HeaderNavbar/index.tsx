import React from 'react';

import {Route} from '~/constants';
import {Input, LanguageDropDown, Link} from '~/components';

import {HeaderNavbar} from './types';

const Navbar: React.FC<HeaderNavbar> = ({
  styles,
  LikeIt,
  headerTable,
  SearchIcon,
}) => {
  return (
    <>
      <nav className={styles.wrapper__content_menu}>{headerTable}</nav>
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
};

export default Navbar;
