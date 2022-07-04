import React, {useState} from 'react';
import classNames from 'classnames';

import {Typography} from '~/components';

import {ProfileSettingsProps} from './types';
import styles from './ProfileSettings.module.scss';

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleDropdownClick = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  const wrapperClassName = classNames(styles.wrapper, {
    [styles.wrapper__open]: isDropdownOpen,
  });

  const containerClassName = classNames(styles.container, {
    [styles.container__open]: isDropdownOpen,
  });

  return (
    <div className={wrapperClassName}>
      <div
        role="button"
        onClick={handleDropdownClick}
        className={containerClassName}>
        <Typography tagName="span" className={styles.container__user}>
          User Name
        </Typography>
      </div>
    </div>
  );
};

export default ProfileSettings;
