import React, {useCallback, useRef} from 'react';

import {Logo} from '~/assets';
import {resetForm} from '~/constants';
import {Typography, Form} from '~/components';

import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
  const signInRef = useRef<any>(null);

  const handleResetPassFormSubmit = useCallback((values) => {
    // dispatch(authActions.login(values));
    // eslint-disable-next-line no-console
    console.log(values, 'signIn');
  }, []);

  return (
    <div className={`container_without-header ${styles.container}`}>
      <Logo className={styles.container__top_img} />
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        Reset Password
      </Typography>
      <Form
        ref={signInRef}
        form={resetForm}
        className={styles.reset}
        inputClassName={styles.reset__block__input__inp}
        labelClassName={styles.reset__block}
        innerClassName={styles.reset__block__input}
        submitText="Reset Password"
        onSubmit={handleResetPassFormSubmit}
      />
    </div>
  );
};

export default ResetPassword;
