import React from 'react';
import classNames from 'classnames';

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

  return (
    <label className={styles.wrapper}>
      <span className={styles.wrapper__title}>Account verification</span>
      <Button onClick={() => onClick(true)} className={verifiedClasses}>
        Verified
      </Button>
      <Button onClick={() => onClick(false)} className={dontVerifiedClasses}>
        Unverified
      </Button>
    </label>
  );
};

export default Verification;
