import React, {useCallback, useRef} from 'react';

// import {useAppDispatch} from '~/hooks';
// import {authActions} from '~/store/auth';
import {Logo} from '~/assets';
import {Route, signInForm} from '~/constants';
import {Typography, Form, Link} from '~/components';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  // const dispatch = useAppDispatch();
  const signInRef = useRef<any>(null);

  const handleSignInFormSubmit = useCallback((values) => {
    // dispatch(authActions.login(values));
    // eslint-disable-next-line no-console
    console.log(values, 'signIn');
  }, []);

  return (
    <div className={`container_without-header ${styles.container}`}>
      <div className={styles.container__top}>
        <Logo className={styles.container__top_img} />
        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title}>
          Sign In
        </Typography>
      </div>
      <Form
        ref={signInRef}
        form={signInForm}
        className={styles.sign_in}
        inputClassName={styles.sign_in__block__input__inp}
        labelClassName={styles.sign_in__block}
        innerClassName={styles.sign_in__block__input}
        submitText="Sign In"
        onSubmit={handleSignInFormSubmit}
      />
      <Link to={Route.ForgotPassword} className={styles.container__forgot}>
        <Typography
          variant="Text"
          type="Semibold"
          className={styles.container__forgot_text}>
          Forgot Password?
        </Typography>
      </Link>

      <div className={styles.container__account}>
        <Typography
          variant="Text"
          type="Semibold"
          className={styles.container__account_reg}>
          Don’t have an account?
        </Typography>
        <Link to={Route.RegistrationPersonalInformation}>
          <Typography
            variant="Text"
            type="Medium"
            className={styles.container__account_sign}>
            Sign up
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
