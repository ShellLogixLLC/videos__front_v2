import React, {useState} from 'react';
import classNames from 'classnames';

import {routes, routesBurger, RoutesProps} from '~/utils';
import {Route} from '~/constants';
import {useHistory} from '~/context';
import {Logo, SearchIcon, LikeIt} from '~/assets';
import {Link, HeaderBurger, HeaderNavbar} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const {history} = useHistory();

  const [isTablet] = useState<boolean>(false);

  const prevRouteValue = history[history.length - 2];

  const ifPreviousRouteActive = (id: number, routesElem: RoutesProps[]) => {
    return routesElem[id - 1].routeName === prevRouteValue;
  };

  const isPreviousOrDisabledClasses = (
    id: number,
    routesProp: RoutesProps[],
  ) => {
    return classNames(styles.wrapper__content_menu__default, {
      [styles.wrapper__content_menu__disabled]: ifPreviousRouteActive(
        id,
        routesProp,
      ),
    });
  };

  const headerTable = routes.map(({id, routeName, pageName}) => (
    <Link
      key={id}
      to={routeName}
      previousClasses={isPreviousOrDisabledClasses(id, routes)}
      activeClassName={styles.wrapper__content_menu_active}>
      {pageName}
    </Link>
  ));

  const headerBurger = routesBurger.map(({id, routeName, pageName}) => (
    <Link
      key={id}
      to={routeName}
      previousClasses={isPreviousOrDisabledClasses(id, routesBurger)}
      activeClassName={styles.wrapper__content_menu_active}>
      {pageName}
    </Link>
  ));

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.wrapper__content} container`}>
        <Link className={styles.wrapper__content_logo} to={Route.Home}>
          <Logo />
        </Link>
        {!isTablet ? (
          <HeaderBurger styles={styles} headerBurger={headerBurger} />
        ) : (
          <HeaderNavbar
            styles={styles}
            LikeIt={LikeIt}
            SearchIcon={SearchIcon}
            headerTable={headerTable}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
