import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {LikeItIcon} from '~/assets';
import {ToggleContext} from '~/context';
import {getCookieFromBrowser} from '~/libraries';
import {
  Link,
  Search,
  SigninDropdown,
  ProfileSettings,
  UnRegisterPopup,
  Typography,
} from '~/components';
import {useAppSelector} from '~/hooks';
import {wishlistSelect} from '~/store/wishlist';

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

  const {wishlistIds} = useAppSelector(wishlistSelect);

  const openLikeItPopup = () => setIsLikeItPopup(true);

  const renderUserIcons = !token ? <SigninDropdown /> : <ProfileSettings />;

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <Search />
      <div className={wrapperClassName}>
        <div className={styles.wrapper__content__other__skeleton} />
        {token ? (
          <div className={styles.wrapper__content__wishlist__parent}>
            <Link
              to={Route.Favorites}
              className={styles.wrapper__content__other__link}>
              <LikeItIcon
                className={styles.wrapper__content__other__wishlist}
              />
            </Link>
            {wishlistIds.length > 0 && (
              <Typography
                className={styles.wrapper__content__wishlist__count}
                tagName="p">
                ({wishlistIds.length})
              </Typography>
            )}
          </div>
        ) : (
          <LikeItIcon
            onClick={openLikeItPopup}
            className={styles.wrapper__content__other__wishlist}
          />
        )}
        {renderUserIcons}
      </div>
      {isLikeItPopup && (
        <UnRegisterPopup
          expanded={isLikeItPopup}
          setExpanded={setIsLikeItPopup}
        />
      )}
    </>
  );
};

export default HeaderNavbar;
