import React from 'react';

import {Link, Typography} from '~/components';
import {Route} from '~/constants';

import styles from './Error.module.scss';

const Error: React.FC = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error__container}>
        <Typography tagName="h1" className={styles.error__container__title}>
          404
        </Typography>
        <Typography
          tagName="p"
          className={styles.error__container__description}>
          Page not found
        </Typography>
        {/*<Link to={Route.Home}>Back to Home <Link/>*/}
      </div>
    </div>
  );
};

export default Error;
