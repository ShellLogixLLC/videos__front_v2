import React from 'react';

import {Route} from '~/constants';
import {PopupProps} from '~/types';
import {Popup, Typography} from '~/components';
import {useLocales} from '~/hooks';

import Link from '../Link';
import styles from '../../layouts/Header/Header.module.scss';

const WishlistModal: React.FC<PopupProps> = ({expanded, setExpanded}) => {
  const {translatedTypo} = useLocales('clickHere');

  return (
    <Popup expanded={expanded} setExpanded={setExpanded}>
      <div className={styles.wrapper__popup}>
        <Typography className={styles.wrapper__popup__text}>
          youShouldBeSignInToAddVideosInYourFavorites
        </Typography>
        <div className={styles.wrapper__popup__bottom_column}>
          <Typography className={styles.wrapper__popup__text}>
            forSignIn
          </Typography>
          <Link to={Route.SignIn} className={styles.wrapper__popup__link}>
            {translatedTypo}
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default WishlistModal;
