import React from 'react';
import classNames from 'classnames';

import Button from '../Button';

import {VerificationProps} from './types';
//
import styles from './Verification.module.scss';

const Verification: React.FC<VerificationProps> = ({value, onChange}) => {
  const verifiedClasses = classNames(styles.wrapper__buttons, {
    [styles.wrapper__buttons_verified]: value,
  });

  const dontVerifiedClasses = classNames(styles.wrapper__buttons, {
    [styles.wrapper__buttons_not_verified]: !value,
  });

  return (
    <label className={styles.wrapper}>
      <span className={styles.wrapper__title}>Account verification</span>
      <Button onClick={() => onChange(true)} className={verifiedClasses}>
        Verified
      </Button>
      <Button onClick={() => onChange(false)} className={dontVerifiedClasses}>
        Unverified
      </Button>
    </label>
  );
};

export default Verification;
