import React, {useState} from 'react';
import classNames from 'classnames';

import {Logo} from '~/assets';
import {Route} from '~/constants';
import {useWindowSize} from '~/hooks';
import {routes, routesBurger} from '~/utils';
import {Link, HeaderBurger, HeaderNavbar} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  // const {history} = useHistory();

  const {isDesktop} = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);

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

  const logoClassNames = classNames(styles.wrapper__content_logo, {
    [styles.wrapper__content_logo_hidden]: expanded && !isDesktop,
  });

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.wrapper__content} container`}>
        <Link className={logoClassNames} to={Route.Home}>
          <Logo />
        </Link>
        {!isDesktop ? (
          <HeaderBurger
            isOpen={isOpen}
            expanded={expanded}
            setExpanded={setExpanded}
            closeHandler={closeHandler}>
            {headerBurger}
          </HeaderBurger>
        ) : (
          <HeaderNavbar expanded={expanded} setExpanded={setExpanded}>
            {headerTable}
          </HeaderNavbar>
        )}
      </div>
    </header>
  );
};

export default Header;
