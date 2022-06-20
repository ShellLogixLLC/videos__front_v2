import React from 'react';

import {Route} from '~/constants';
import {Link, Typography} from '~/components';

import styles from './Error.module.scss';

const Error: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Typography tagName="h1" className={styles.wrapper__title}>
        404
      </Typography>
      <Typography tagName="p" className={styles.wrapper__description}>
        OOPS !!! Page not found
      </Typography>
      <Link className={styles.wrapper__route} to={Route.Home}>
        Home
      </Link>
    </div>
  );
};

export default Error;
