import React, {useContext, useState} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {ToggleContext} from '~/context';
import {getCookieFromBrowser} from '~/libraries';
import {LikeIt, UserIcon, UserRound} from '~/assets';
import {
  Link,
  ProfileModal,
  WishlistModal,
  LanguageDropDown,
} from '~/components';

import styles from '../../layouts/Header/Header.module.scss';

const HeaderNavbar: React.FC = ({children}) => {
  const token = getCookieFromBrowser('token');
  const {expanded} = useContext(ToggleContext);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLikeItPopup, setIsLikeItPopup] = useState<boolean>(false);

  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  const handleUserModal = () => setIsOpenModal(true);

  const openLikeItPopup = () => setIsLikeItPopup(!isLikeItPopup);

  const renderUserIcons = !token ? (
    <Link to={Route.SignIn} className={styles.wrapper__content__other__sign_in}>
      <UserIcon />
    </Link>
  ) : (
    <UserRound
      className={styles.wrapper__content__user_icon}
      onClick={handleUserModal}
    />
  );

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <div className={styles.wrapper__content__other}>
        <div className={styles.wrapper__content__other__skeleton} />
        {token ? (
          <Link
            className={styles.wrapper__content__other__link}
            to={Route.MyFavorite}>
            <LikeIt className={styles.wrapper__content__other__wishlist} />
          </Link>
        ) : (
          <LikeIt
            onClick={openLikeItPopup}
            className={styles.wrapper__content__other__wishlist}
          />
        )}
        {renderUserIcons}
        <LanguageDropDown />
      </div>
      <ProfileModal expanded={isOpenModal} setExpanded={setIsOpenModal} />
      <WishlistModal expanded={isLikeItPopup} setExpanded={setIsLikeItPopup} />
    </>
  );
};

export default HeaderNavbar;
