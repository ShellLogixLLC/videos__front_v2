import React from 'react';
import classNames from 'classnames';

import {routes} from '~/utils';
import {Route} from '~/constants';
import {useHistory} from '~/context';
import {Logo, SearchIcon, LikeIt} from '~/assets';
import {Link, Input, LanguageDropDown} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const {history} = useHistory();

  const prevRouteValue = history[history.length - 2];

  const ifPreviousRouteActive = (id: any) => {
    return routes[id - 1].routeName === prevRouteValue;
  };

  const headerTable = routes.map(({id, routeName, pageName}) => {
    const isPreviousOrDisabledClasses = classNames(
      styles.wrapper__content_menu__default,
      {
        [styles.wrapper__content_menu__disabled]: ifPreviousRouteActive(id),
      },
    );

    return (
      <Link
        key={id}
        to={routeName}
        previousClasses={isPreviousOrDisabledClasses}
        activeClassName={styles.wrapper__content_menu_active}>
        {pageName}
      </Link>
    );
  });

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
      </div>
    </header>
  );
};

export default Header;
