import React, {useState} from 'react';
import classNames from 'classnames';

import Button from '../Button';

import {VerificationProps} from './types';
import styles from './Verification.module.scss';

const Verification: React.FC<VerificationProps> = ({inputProps}) => {
  const [isVerification, setIsVerification] = useState<boolean>(true);

  const verifiedRegister = () => {
    if (!isVerification) {
      setIsVerification(true);
    }
  };

  const unVerifiedRegister = () => {
    if (isVerification) {
      setIsVerification(!isVerification);
    }
  };

  const verifiedClasses = classNames(styles.wrapper__buttons, {
    [styles.wrapper__buttons_verified]: isVerification,
  });

  const dontVerifiedClasses = classNames(styles.wrapper__buttons, {
    [styles.wrapper__buttons_not_verified]: !isVerification,
  });

  return (
    <label className={styles.wrapper} {...inputProps}>
      <span className={styles.wrapper__title}>Account verification</span>
      <Button onClick={verifiedRegister} className={verifiedClasses}>
        Verified
      </Button>
      <Button onClick={unVerifiedRegister} className={dontVerifiedClasses}>
        Unverified
      </Button>
    </label>
  );
};

export default Verification;
