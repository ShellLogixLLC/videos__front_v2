import React, {useState} from 'react';
// import classNames from 'classnames';

// import {I18nContext} from '~/context';
import {Logo} from '~/assets';
import {Route} from '~/constants';
// import {useHistory} from '~/context';
import {useWindowSize} from '~/hooks';
import {Link, HeaderBurger, HeaderNavbar} from '~/components';
import {
  routes,
  routesBurger,
  // RoutesProps
} from '~/utils';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  // const t = useContext(I18nContext);
  // const {history} = useHistory();

  const {isMinTablet} = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  // const prevRouteValue = history[history.length - 2];

  // const ifPreviousRouteActive = (id: number, routesElem: RoutesProps[]) => {
  //   return routesElem[id - 1].routeName === prevRouteValue;
  // };

  // const previousStyleOrDisabled = (id: number, routesProp: RoutesProps[]) => {
  //   return classNames(styles.wrapper__content_menu__default, {
  //     [styles.wrapper__content_menu__disabled]: ifPreviousRouteActive(
  //       id,
  //       routesProp,
  //     ),
  //   });
  // };

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
      {pageName}
    </Link>
  ));

  const headerBurger = routesBurger.map(({id, routeName, pageName}) => (
    <Link
      key={id}
      to={routeName}
      className={styles.wrapper__content__burger__container__nav__items}
      activeClassName={
        styles.wrapper__content__burger__container__nav__items_active
      }
      // previousClasses={previousStyleOrDisabled(id, routesBurger)}
    >
      {pageName}
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
