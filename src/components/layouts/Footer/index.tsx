import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={styles.wrapper}>
      <div className={`${styles.wrapper_content}container`}>
        <p className={styles.wrapper_content__text}>
          ©Videos {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
