import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {UserIcon} from '~/assets';
import {Route} from '~/constants';
import {useOnClickOutside} from '~/hooks';
import {LanguageDropDown, Link, Typography} from '~/components';

import styles from './SigninDropdown.module.scss';

const SigninDropdown: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const wrapperClassName = classNames(styles.wrapper, {
    [styles.wrapper__open]: isDropdownOpen,
  });

  const dropdownClassName = classNames(styles.content, {
    [styles.content__open]: isDropdownOpen,
  });

  const handleDropdownClick = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (): void => {
    setDropdownOpen(false);
  };

  useOnClickOutside(dropdownRef, closeDropdown);

  return (
    <div
      role="button"
      onClick={handleDropdownClick}
      className={wrapperClassName}>
      <div ref={dropdownRef} className={styles.container}>
        <UserIcon className={styles.container__user_icon} />
        <div className={dropdownClassName}>
          <ul className={styles.content__list}>
            <li className={styles.content__list__link}>
              <Link to={Route.RegistrationPersonalInformation}>
                <Typography
                  className={styles.content__list__link__text}
                  tagName="span">
                  register
                </Typography>
              </Link>
            </li>
            <li className={styles.content__list__link}>
              <Link to={Route.SignIn}>
                <Typography
                  className={styles.content__list__link__text}
                  tagName="span">
                  signIn
                </Typography>
              </Link>
            </li>
            {/*<LanguageDropDown />*/}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SigninDropdown;
