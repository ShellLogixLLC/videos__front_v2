import React from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';

import Typography from '~/components/shared/Typography';

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

  const {t} = useTranslation();

  return (
    <label className={styles.wrapper}>
      <Typography tagName="span" className={styles.wrapper__title}>
        accountVerification
      </Typography>
      <Button onClick={() => onClick(true)} className={verifiedClasses}>
        {t('verified')}
      </Button>
      <Button onClick={() => onClick(false)} className={dontVerifiedClasses}>
        {t('unverified')}
      </Button>
    </label>
  );
};

export default Verification;
