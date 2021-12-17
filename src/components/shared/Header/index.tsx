import React from 'react';
import shortid from 'shortid';

import {Logo, SearchIcon, LikIt} from '~/assets';
import {routes} from '~/utils';

import Link from '../Link';
import Input from '../Input';
import LanguageDropDown from '../LanguageDropDown';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const headerTablick = routes.map(({routeName, pageName, linkCLasses}) => (
    <Link key={shortid.generate()} className={linkCLasses} to={routeName}>
      {pageName}
    </Link>
  ));

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.wrapper_content} container`}>
        <Link className={styles.wrapper_content_logo} to="/">
          <Logo />
        </Link>
        <nav className={styles.wrapper_content_menu}>{headerTablick}</nav>
        <div className={styles.wrapper_content_other}>
          <Input
            type="text"
            name="Global search"
            placeholder="Search"
            RightIcon={SearchIcon}
            className={styles.wrapper_content_other__search}
          />
          <LikIt />
          <LanguageDropDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
