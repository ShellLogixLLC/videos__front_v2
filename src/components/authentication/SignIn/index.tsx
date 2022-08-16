import React, {useCallback} from 'react';

import {LogoIcon} from '~/assets';
import {Loader} from '~/components';
import {Route, signInForm} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector, useLocales} from '~/hooks';
import {LoadingStates} from '~/store/types';

import Form from '../../shared/forms/Form';
import Link from '../../shared/Link';
import Typography from '../../shared/Typography';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const {loading} = useAppSelector(authSelect);

  const handleSignInFormSubmit = useCallback(
    (values) => {
      dispatch(authActions.login(values));
    },
    [dispatch],
  );

  const {translatedTypo} = useLocales('signIn');

  return (
    <div className={`container_without-header ${styles.container}`}>
      <div className={styles.container__top}>
        <LogoIcon className={styles.container__top_img} />
        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title}>
          signIn
        </Typography>
      </div>
      <Form
        form={signInForm}
        className={styles.sign_in}
        inputClassName={styles.sign_in__block__input__inp}
        labelClassName={styles.sign_in__block}
        innerClassName={styles.sign_in__block__input}
        submitText={translatedTypo || ''}
        onSubmit={handleSignInFormSubmit}
      />
      <Link to={Route.ForgotPassword} className={styles.container__forgot}>
        <Typography
          variant="Text"
          type="Semibold"
          className={styles.container__forgot_text}>
          forgotPassword
        </Typography>
      </Link>

      <div className={styles.container__account}>
        <Typography
          variant="Text"
          type="Semibold"
          className={styles.container__account_reg}>
          dontHaveAnAccount
        </Typography>
        <Link to={Route.RegistrationPersonalInformation}>
          <Typography
            variant="Text"
            type="Medium"
            className={styles.container__account_sign}>
            signUp
          </Typography>
        </Link>
      </div>
      <Link to={Route.Home} className={styles.container__route}>
        <Typography>backToHome</Typography>
      </Link>
      {loading === LoadingStates.LOADING && <Loader isVertical />}
    </div>
  );
};

export default SignIn;
