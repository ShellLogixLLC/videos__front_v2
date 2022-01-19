import React, {useRef, useCallback} from 'react';

import {Logo} from '~/assets';
import {Typography, Form} from '~/components';
import {forgotPasswordForm} from '~/constants';

import styles from './ForgotPassword.module.scss';

const ForgotPassword: React.FC = () => {
  const forgotPasswordRef = useRef<any>(null);

  const handleForgotPasswordSubmit = useCallback((values) => {
    // eslint-disable-next-line no-console
    console.log(values, 'forgot');
  }, []);

  return (
    <div className="container_without-header">
      <div className={styles.container__top}>
        <Logo className={styles.container__top_img} />
        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title}>
          Forgot Password
        </Typography>

        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title_bio}>
          Enter your email address and we’ll send you instructions to reset your
          password.
        </Typography>
      </div>

      <Form
        ref={forgotPasswordRef}
        form={forgotPasswordForm}
        className={styles.sign_in}
        inputClassName={styles.sign_in__block__input__inp}
        labelClassName={styles.sign_in__block}
        labelText={styles.sign_in__block__text}
        innerClassName={styles.sign_in__block__input}
        submitText="Reset Password"
        onSubmit={handleForgotPasswordSubmit}
      />
      {/* <div className={styles.container__account}>
            <Typography
              variant="Text"
              type="Semibold"
              className={styles.container__account_reg}>
              Back to sign in
            </Typography>
            <Link to={Route.SignIn}>
              <Typography
                variant="Text"
                type="Medium"
                className={styles.container__account_sign}>
                Sign In
              </Typography>
            </Link>
          </div> */}
    </div>
  );
};

export default ForgotPassword;
