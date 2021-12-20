import React from 'react';

import {routes} from '~/utils';
import {Logo, SearchIcon, LikeIt} from '~/assets';
import {Link, Input, LanguageDropDown} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const headerTable = routes.map(({id, routeName, pageName, linkCLasses}) => (
    <Link
      key={id}
      to={routeName}
      className={linkCLasses}
      activeClassName={styles.wrapper__content_menu_active}>
      {pageName}
    </Link>
  ));

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.wrapper__content} container`}>
        <Link className={styles.wrapper__content_logo} to="/">
          <Logo />
        </Link>
        <nav className={styles.wrapper__content_menu}>{headerTable}</nav>
        <div className={styles.wrapper__content__other}>
          <Input
            type="text"
            name="Global search"
            placeholder="Search"
            RightIcon={SearchIcon}
            className={styles.wrapper__content__other__search}
            rightIconStyle={styles.wrapper__content__other__right_icon}
          />
          <LikeIt />
          {/* //  className={styles.wrapper__content__other__icon} /> */}
          <LanguageDropDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
