import React from 'react';
import classNames from 'classnames';

import Typography from '~/components/shared/Typography';
import useLocales from '~/hooks/useLocales';

import Button from '../Button';

import {VerificationProps} from './types';
import styles from './Verification.module.scss';

const Verification: React.FC<VerificationProps> = ({value, onClick}) => {
  const verifiedClasses = classNames(styles.wrapper__buttons, {
    [styles.wrapper__buttons_verified]: value,
  });

  const dontVerifiedClasses = classNames(styles.wrapper__buttons, {
    [styles.wrapper__buttons_not_verified]: !value,
  });

  const {translatedTypo: translatedVerifiedText} = useLocales('verified');
  const {translatedTypo: translatedUnverifiedText} = useLocales('unverified');

  return (
    <label className={styles.wrapper}>
      <Typography tagName="span" className={styles.wrapper__title}>
        accountVerification
      </Typography>
      <Button onClick={() => onClick(true)} className={verifiedClasses}>
        {translatedVerifiedText}
      </Button>
      <Button onClick={() => onClick(false)} className={dontVerifiedClasses}>
        {translatedUnverifiedText}
      </Button>
    </label>
  );
};

export default Verification;
