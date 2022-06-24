import React from 'react';

import {Typography} from '~/components';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={styles.wrapper}>
      <div className={`${styles.wrapper_content}container`}>
        <Typography tagName="span" className={styles.wrapper_content__text}>
          ©Videos {year}
        </Typography>
        <Typography tagName="span" className={styles.wrapper_content__text}>
          allRightsReserved
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
