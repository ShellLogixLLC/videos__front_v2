import React from 'react';

import {Route} from '~/constants';
import {PopupProps} from '~/types';
import {useLocales} from '~/hooks';
import {Button, Link, Popup, Typography} from '~/components';

import styles from './UnRegisterPopup.module.scss';

const UnRegisterPopup: React.FC<PopupProps> = ({
  title,
  expanded,
  setExpanded,
}) => {
  const handleCancel = () => setExpanded(false);

  const {translatedTypo: cancel} = useLocales('cancel');
  const {translatedTypo: signIn} = useLocales('signIn');

  return (
    <Popup
      isClose={false}
      expanded={expanded}
      setExpanded={setExpanded}
      className={styles.wrapper}>
      <Typography className={styles.wrapper__title} tagName="h2">
        {title || 'youShouldBeSignInToAddVideosInYourFavorites'}
      </Typography>
      <div className={styles.wrapper__content}>
        <Button className={styles.wrapper__content__btn} onClick={handleCancel}>
          {cancel}
        </Button>
        <Link to={Route.SignIn} className={styles.wrapper__content__link}>
          {signIn}
        </Link>
      </div>
    </Popup>
  );
};

export default UnRegisterPopup;
