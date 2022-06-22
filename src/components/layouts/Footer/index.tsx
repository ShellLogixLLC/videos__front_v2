import React from 'react';
import {useTranslation} from 'next-i18next';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const {t} = useTranslation('common');

  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={styles.wrapper}>
      <div className={`${styles.wrapper_content}container`}>
        <p className={styles.wrapper_content__text}>
          ©Videos {year} {t('allRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
