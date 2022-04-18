import React, {useState, useContext} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useTranslation} from 'next-i18next';

import {Route} from '~/constants';
import {ToggleContext} from '~/context';
import {useWindowSize} from '~/hooks';
import {CategoryService} from '~/api';
import {routes, routesBurger} from '~/utils';
import {Menu, Logo, MobileFilterIcon, SearchBackArrowIcon} from '~/assets';
import {
  Link,
  Button,
  Search,
  MobileMenu,
  MobileFilter,
  HeaderNavbar,
  SubCategories,
} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const {t} = useTranslation();

  const {data} = CategoryService.useCategories();
  const categories = data?.categories;

  const {expanded} = useContext(ToggleContext);
  const {isDesktop} = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFilter, toggleFilter] = useToggle(false);
  const [isCategories, toggleCategories] = useToggle(false);

  const logoClassNames = classNames(styles.wrapper__content_logo, {
    [styles.wrapper__content_logo_hidden]: expanded && !isDesktop,
  });

  const bgClassName = classNames({
    [styles.wrapper__active_bg]: isOpen,
  });

  const handleOpenMenu = () => setIsOpen(true);

  const datas = categories?.length && [
    ...categories,
    ...categories,
    ...categories,
  ];
  const toggleCategory = () => {
    if (!isDesktop) {
      toggleCategories();
    }
  };
  console.log('isCategories', isCategories);

  const renderCategory = (
    <div
      className={styles.wrapper__content_menu__category}
      onClick={toggleCategory}>
      <div
        className={styles.wrapper__content_menu__link}
        // activeClassName={styles.wrapper__content_menu__link_active}
      >
        <p>Category</p>
        <SearchBackArrowIcon
          className={
            (styles.wrapper__content_menu__icon,
            {
              [styles.wrapper__content_menu__icon__rotate]: isCategories,
            })
          }
        />
      </div>
      <SubCategories
        wrapperClass={classNames(styles.sub_category, {
          [styles.sub_category__mobile]: isCategories,
        })}
        subCategoriesList={datas}
      />
    </div>
  );

  const headerTable = routes.map(({id, routeName, pageName}) =>
    id === 1 ? (
      renderCategory
    ) : (
      <Link
        key={id}
        to={routeName}
        className={styles.wrapper__content_menu__link}
        activeClassName={styles.wrapper__content_menu__link_active}>
        {t(pageName)}
      </Link>
    ),
  );

  const renderMobileMenu = routesBurger.map(({id, routeName, pageName}) =>
    id === 3 ? (
      renderCategory
    ) : (
      <Link
        key={id}
        to={routeName}
        className={styles.wrapper__content__burger__container__nav__items}
        activeClassName={
          styles.wrapper__content__burger__container__nav__items_active
        }>
        {t(pageName)}
      </Link>
    ),
  );

  return (
    <header className={styles.wrapper}>
      <div className={bgClassName} />
      <div className={`${styles.wrapper__content} container`}>
        <Link className={logoClassNames} to={Route.Home}>
          <Logo />
        </Link>
        <div className={styles.wrapper__content__container}>
          <MobileFilterIcon
            onClick={toggleFilter}
            className={styles.wrapper__content__filter_icon}
          />
          <Button
            onClick={handleOpenMenu}
            className={styles.wrapper__content__burger_btn}>
            <Menu className={styles.wrapper__content__burger_icon} />
          </Button>
        </div>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}>
          {renderMobileMenu}
        </MobileMenu>
        <HeaderNavbar>{headerTable}</HeaderNavbar>
        <Search />
      </div>
      <MobileFilter isFilter={isFilter} toggleFilter={toggleFilter} />
    </header>
  );
};

export default Header;
