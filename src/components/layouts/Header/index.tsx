import React, {useState} from 'react';
import {useTranslation} from 'next-i18next';

import {Logo} from '~/assets';
import {Route} from '~/constants';
import {useWindowSize} from '~/hooks';
import {routes, routesBurger} from '~/utils';
import {Link, HeaderBurger, HeaderNavbar} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const {t} = useTranslation();
  const {isMinTablet} = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeHandler = () => {
    setIsOpen(!isOpen);
    document.body.style.overflowY = isOpen ? 'hidden' : 'visible';
  };

  const headerTable = routes.map(({id, routeName, pageName}) => (
    <Link
      key={id}
      to={routeName}
      className={styles.wrapper__content_menu__link}
      activeClassName={styles.wrapper__content_menu__link_active}>
      {t(pageName)}
    </Link>
  ));

  const headerBurger = routesBurger.map(({id, routeName, pageName}) => (
    <Link
      key={id}
      to={routeName}
      className={styles.wrapper__content__burger__container__nav__items}
      activeClassName={
        styles.wrapper__content__burger__container__nav__items_active
      }>
      {t(pageName)}
    </Link>
  ));

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.wrapper__content} container`}>
        <Link className={styles.wrapper__content_logo} to={Route.Home}>
          <Logo />
        </Link>
        {isMinTablet ? (
          <HeaderBurger isOpen={isOpen} closeHandler={closeHandler}>
            {headerBurger}
          </HeaderBurger>
        ) : (
          <HeaderNavbar>{headerTable}</HeaderNavbar>
        )}
      </div>
    </header>
  );
};

export default Header;
