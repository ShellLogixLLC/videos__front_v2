import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.wrapper}>
    <div className={`${styles.wrapper_content}container`}>
      <p className={styles.wrapper_content__text}>
        ©Videos 2020 All rights reserved.
      </p>
      <p className={styles.wrapper_content__text}>
        Videos. powered by ShellLogix.
      </p>
    </div>
  </footer>
);

export default Footer;
