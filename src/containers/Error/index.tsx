import React from 'react';

import {Link, Typography} from '~/components';
import {Route} from '~/constants';
import {Logo} from '~/assets';

import styles from './Error.module.scss';

const Error: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Typography tagName="h1" className={styles.container__title}>
          404
        </Typography>
        <Typography tagName="p" className={styles.container__description}>
          OOPS !!! Page not found
        </Typography>
        <Link className={styles.container__route} to={Route.Home}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
