import React, {useState} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useTranslation} from 'next-i18next';

import {Logo} from '~/assets';
import {Route} from '~/constants';
import {useWindowSize} from '~/hooks';
import {routes, routesBurger} from '~/utils';
import {Link, HeaderBurger, HeaderNavbar} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const {t} = useTranslation();
  const {isDesktop} = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expanded, toggleExpanded] = useToggle(false);

  const logoClassNames = classNames(styles.wrapper__content_logo, {
    [styles.wrapper__content_logo_hidden]: expanded && !isDesktop,
  });

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
        <Link className={logoClassNames} to={Route.Home}>
          <Logo />
        </Link>
        {!isDesktop ? (
          <HeaderBurger
            isOpen={isOpen}
            expanded={expanded}
            setIsOpen={setIsOpen}
            toggleExpanded={toggleExpanded}>
            {headerBurger}
          </HeaderBurger>
        ) : (
          <HeaderNavbar expanded={expanded} toggleExpanded={toggleExpanded}>
            {headerTable}
          </HeaderNavbar>
        )}
      </div>
    </header>
  );
};

export default Header;
