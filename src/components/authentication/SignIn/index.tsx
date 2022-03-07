import React, {useCallback} from 'react';

import {Logo} from '~/assets';
import {RouterService} from '~/services';
import {Route, signInForm} from '~/constants';

import Form from '../../shared/forms/Form';
import Link from '../../shared/Link';
import Typography from '../../shared/Typography';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  const handleSignInFormSubmit = useCallback((values) => {
    RouterService.push(Route.Home);
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
        // ref={signInRef}
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
