import React, {useContext} from 'react';
import classNames from 'classnames';

import {Route} from '~/constants';
import {ToggleContext} from '~/context';
import {LikeIt, UserIcon} from '~/assets';

import Link from '../Link';
import LanguageDropDown from '../LanguageDropDown';
import styles from '../../layouts/Header/Header.module.scss';

const HeaderNavbar: React.FC = ({children}) => {
  const {expanded} = useContext(ToggleContext);

  const navClassName = classNames(styles.wrapper__content_menu, {
    [styles.wrapper__content_menu_hidden]: expanded,
  });

  return (
    <>
      <nav className={navClassName}>{children}</nav>
      <div className={styles.wrapper__content__other}>
        <div className={styles.wrapper__content__other__skeleton} />
        <Link
          className={styles.wrapper__content__other__link}
          to={Route.MyFavorite}>
          <LikeIt className={styles.wrapper__content__other__wishlist} />
        </Link>
        <Link to="/sign-in" className={styles.wrapper__content__other__sign_in}>
          <UserIcon />
        </Link>
        <LanguageDropDown />
      </div>
    </>
  );
};
export default HeaderNavbar;
