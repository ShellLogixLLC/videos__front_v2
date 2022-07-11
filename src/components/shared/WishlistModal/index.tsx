import React from 'react';

import {Route} from '~/constants';
import {PopupProps} from '~/types';
import {Popup, Typography} from '~/components';

import Link from '../Link';
import styles from '../../layouts/Header/Header.module.scss';

const WishlistModal: React.FC<PopupProps> = ({expanded, setExpanded}) => (
  <Popup expanded={expanded} setExpanded={setExpanded}>
    <div className={styles.wrapper__popup}>
      <Typography className={styles.wrapper__popup__text}>
        You should be sign in to add videos in your favorites.
      </Typography>
      <div className={styles.wrapper__popup__bottom_column}>
        <Typography className={styles.wrapper__popup__text}>
          For Sign in
        </Typography>
        <Link to={Route.SignIn} className={styles.wrapper__popup__link}>
          click here.
        </Link>
      </div>
    </div>
  </Popup>
);

export default WishlistModal;
