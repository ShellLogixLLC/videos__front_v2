import React, {useState} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useTranslation} from 'next-i18next';

import {Logo} from '~/assets';
import {Menu} from '~/assets';
import {Route} from '~/constants';
import {useWindowSize} from '~/hooks';
import {routes, routesBurger} from '~/utils';
import {
  Link,
  Button,
  Search,
  MobileMenu,
  MobileFilter,
  HeaderNavbar,
} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const {t} = useTranslation();
  const {isDesktop} = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expanded, toggleExpanded] = useToggle(false);

  const logoClassNames = classNames(styles.wrapper__content_logo, {
    [styles.wrapper__content_logo_hidden]: expanded && !isDesktop,
  });

  const handleOpenMenu = () => setIsOpen(true);

  const headerTable = routes.map(({id, routeName, pageName}) => (
    <Link
      key={id}
      to={routeName}
      className={styles.wrapper__content_menu__link}
      activeClassName={styles.wrapper__content_menu__link_active}>
      {t(pageName)}
    </Link>
  ));

  const renderMobileMenu = routesBurger.map(({id, routeName, pageName}) => (
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

  const haederMenu = !isDesktop ? (
    <>
      <div className={styles.wrapper__content__container}>
        <Search toggleExpanded={toggleExpanded} expanded={expanded} />
        <MobileFilter />
        <Button
          onClick={handleOpenMenu}
          className={styles.wrapper__content__burger_btn}>
          <Menu className={styles.wrapper__content__burger_icon} />
        </Button>
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        {renderMobileMenu}
      </MobileMenu>
    </>
  ) : (
    <HeaderNavbar expanded={expanded} toggleExpanded={toggleExpanded}>
      {headerTable}
    </HeaderNavbar>
  );

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.wrapper__content} container`}>
        <Link className={logoClassNames} to={Route.Home}>
          <Logo />
        </Link>
        {haederMenu}
      </div>
    </header>
  );
};

export default Header;
