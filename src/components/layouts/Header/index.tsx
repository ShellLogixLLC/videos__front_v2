import React, {useState, useContext, useEffect} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';
import {useRouter} from 'next/router';

import {ToggleContext} from '~/context';
import {useWindowSize} from '~/hooks';
import {CategoryService} from '~/api';
import {getCookieFromBrowser} from '~/libraries';
import {NavigationConstants, Route} from '~/constants';
import {routes, routesBurger, setQueryParams} from '~/utils';
import {
  LogoIcon,
  MenuIcon,
  MobileFilterIcon,
  SearchBackArrowIcon,
} from '~/assets';
import {
  Link,
  Button,
  MobileMenu,
  Typography,
  MobileFilter,
  HeaderNavbar,
  SubCategories,
  WishlistModal,
} from '~/components';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const token = getCookieFromBrowser('token');
  const {expanded} = useContext(ToggleContext);
  const {isDesktop} = useWindowSize();
  const {pathname, query} = useRouter();

  const {data} = CategoryService.useCategories();
  const categories = data?.categories;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFilter, toggleFilter] = useToggle(false);
  const [isCategories, setIsCategories] = useState<boolean>(false);
  const [isLikeItPopup, setIsLikeItPopup] = useState<boolean>(false);
  const [isCategoriesHoverable, setCategoriesHoverable] =
    useState<boolean>(false);

  const logoClassNames = classNames(styles.wrapper__content_logo, {
    [styles.wrapper__content_logo_hidden]: expanded && !isDesktop,
  });

  const bgClassName = classNames({
    [styles.wrapper__active_bg]: isOpen,
  });

  const handleOpenMenu = () => setIsOpen(true);

  const openLikeItPopup = () => {
    setIsOpen(false);
    setIsLikeItPopup(true);
  };

  const toggleCategory = (): void => {
    if (!isDesktop) {
      setIsCategories(!isCategories);
      setCategoriesHoverable(true);
    }
  };

  const onMouseEnter = (): void => {
    if (isDesktop) {
      setCategoriesHoverable(true);
    }
  };

  const onMouseLeave = (): void => {
    if (isDesktop) {
      setCategoriesHoverable(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, query.name]);

  useEffect(() => {
    if (!isOpen || isDesktop) {
      setIsCategories(false);
    }
  }, [isDesktop, isOpen]);

  const setNewQueryParams = () => setQueryParams({...query, page: 0});

  const renderCategory = () => {
    const isActiveItem = pathname === '/category/[name]';

    const itemClasses = classNames(styles.wrapper__content_menu__link, {
      [styles.wrapper__content_menu__link_active]: isActiveItem,
    });

    const iconClasses = classNames(styles.wrapper__content_menu__icon, {
      [styles.wrapper__content_menu__icon__rotate]: isCategories,
    });

    const subCategoriesClasses = classNames({
      [styles.sub_category]: !isCategories && isDesktop,
      [styles.sub_category__mobile]: isCategories,
    });

    return (
      <div
        onMouseLeave={onMouseLeave}
        key="categoryList"
        className={styles.wrapper__content_menu__category}>
        <div
          onMouseEnter={onMouseEnter}
          onClick={toggleCategory}
          className={styles.wrapper__content_menu__category__child}>
          <Typography className={itemClasses}>categories</Typography>
          <SearchBackArrowIcon className={iconClasses} />
        </div>
        {isCategoriesHoverable && (
          <SubCategories
            wrapperClass={subCategoriesClasses}
            subCategoriesList={categories}
          />
        )}
      </div>
    );
  };

  const headerTable = routes.map(({id, routeName, pageName, queryValue}) => {
    return pageName === NavigationConstants.Categories ? (
      renderCategory()
    ) : (
      <Link
        key={id}
        to={routeName}
        queryKey="name"
        queryValue={queryValue && queryValue}
        onClick={setNewQueryParams}
        className={styles.wrapper__content_menu__link}
        activeClassName={styles.wrapper__content_menu__link_active}>
        <Typography className={styles.wrapper__content_menu__link__typo}>
          {pageName}
        </Typography>
      </Link>
    );
  });

  const renderMobileMenu = routesBurger.map(
    ({id, routeName, pageName, queryValue}) => {
      return pageName === NavigationConstants.Categories ? (
        renderCategory()
      ) : !token && pageName === NavigationConstants.Favorites ? (
        <div
          key={id}
          // className={styles.wrapper__content__burger__container__nav__items}
          onClick={openLikeItPopup}>
          <Typography
            className={styles.wrapper__content__burger__container__nav__items}>
            {pageName}
          </Typography>
        </div>
      ) : (
        <Link
          key={id}
          to={routeName}
          queryKey="name"
          queryValue={queryValue && queryValue}
          onClick={setNewQueryParams}
          className={styles.wrapper__content__burger__container__nav__items}
          activeClassName={
            styles.wrapper__content__burger__container__nav__items_active
          }>
          <Typography
            className={
              styles.wrapper__content__burger__container__nav__items__typo
            }>
            {pageName}
          </Typography>
        </Link>
      );
    },
  );

  return (
    <header className={styles.wrapper}>
      <div className={bgClassName} />
      <div className={`${styles.wrapper__content} container`}>
        <Link className={logoClassNames} to={Route.Home}>
          <LogoIcon />
        </Link>

        <HeaderNavbar>{headerTable}</HeaderNavbar>
        <div className={styles.wrapper__content__container}>
          <MobileFilterIcon
            onClick={toggleFilter}
            className={styles.wrapper__content__filter_icon}
          />
          <Button
            onClick={handleOpenMenu}
            className={styles.wrapper__content__burger_btn}>
            <MenuIcon className={styles.wrapper__content__burger_icon} />
          </Button>
        </div>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}>
          {renderMobileMenu}
        </MobileMenu>
      </div>
      <MobileFilter isFilter={isFilter} toggleFilter={toggleFilter} />
      <WishlistModal expanded={isLikeItPopup} setExpanded={setIsLikeItPopup} />
    </header>
  );
};

export default Header;
