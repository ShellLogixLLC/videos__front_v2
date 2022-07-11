import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {LikeItIcon} from '~/assets';
import {ToggleContext} from '~/context';
import {getCookieFromBrowser} from '~/libraries';
import {
  Link,
  Search,
  WishlistModal,
  SigninDropdown,
  ProfileSettings,
  LanguageDropDown,
} from '~/components';

import styles from '../../layouts/Header/Header.module.scss';

import {HeaderNavbarProps} from './types';

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({children}) => {
  const {expanded} = useContext(ToggleContext);
  const token = getCookieFromBrowser('token');

  const [isLikeItPopup, setIsLikeItPopup] = useState<boolean>(false);

  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  const wrapperClassName = classNames(styles.wrapper__content__other, {
    [styles.wrapper__content__other__withToken]: token,
  });

  const openLikeItPopup = () => setIsLikeItPopup(!isLikeItPopup);

  const renderUserIcons = !token ? <SigninDropdown /> : <ProfileSettings />;

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <Search />
      <div className={wrapperClassName}>
        <div className={styles.wrapper__content__other__skeleton} />
        {token ? (
          <Link
            className={styles.wrapper__content__other__link}
            to={Route.MyFavorite}>
            <LikeItIcon className={styles.wrapper__content__other__wishlist} />
          </Link>
        ) : (
          <LikeItIcon
            onClick={openLikeItPopup}
            className={styles.wrapper__content__other__wishlist}
          />
        )}
        <LanguageDropDown />
        {renderUserIcons}
      </div>
      <WishlistModal expanded={isLikeItPopup} setExpanded={setIsLikeItPopup} />
    </>
  );
};

export default HeaderNavbar;
