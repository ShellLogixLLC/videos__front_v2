import React from 'react';

import {Route} from '~/constants';
import {Link, Typography} from '~/components';

import styles from './EmptyWishlist.module.scss';

const EmptyWishlist: React.FC = () => {
  return (
    <div className={styles.container}>
      <Typography tagName="span" className={styles.container__title}>
        yourWishlistIsEmpty
      </Typography>
      <div className={styles.wrapper}>
        <Typography tagName="span" className={styles.wrapper__title}>
          exploreMoreAndShortlist
        </Typography>
        <Link className={styles.wrapper__link} to={Route.Home}>
          <Typography tagName="span" className={styles.wrapper__link__text}>
            startExploring
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default EmptyWishlist;
