import React from 'react';

import {LogoIcon} from '~/assets';

import Typography from '../../shared/Typography';

import styles from './ChangePassword.module.scss';

const ChangePassword: React.FC = () => {
  return (
    <div className={`container_without-header ${styles.container}`}>
      <LogoIcon className={styles.container__top_img} />
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        changePassword
      </Typography>
    </div>
  );
};

export default ChangePassword;
