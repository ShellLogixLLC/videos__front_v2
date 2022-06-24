import React from 'react';
import {useTranslation} from 'next-i18next';

import {Route} from '~/constants';
import {Link, Typography} from '~/components';

import styles from './Error.module.scss';

const Error: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Typography tagName="h1" className={styles.wrapper__title}>
        404
      </Typography>
      <Typography tagName="p" className={styles.wrapper__description}>
        pageNotFound
      </Typography>
      <Link className={styles.wrapper__route} to={Route.Home}>
        {t('home')}
      </Link>
    </div>
  );
};

export default Error;
