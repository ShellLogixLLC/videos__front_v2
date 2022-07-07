import React, {useCallback, useEffect} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';

import {LogoIcon} from '~/assets';
import {Route} from '~/constants';
import {Loader} from '~/components';
import {forgotPasswordForm} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Link from '../../shared/Link';
import Form from '../../shared/forms/Form';
import Typography from '../../shared/Typography';

import styles from './ForgotPassword.module.scss';

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {error, isVerified} = useAppSelector(authSelect);

  const [isLoading, toggleIsLoading] = useToggle(false);

  const ifResetButton = isVerified ? 'Resend link' : 'Reset Password';

  const ifSubmitText = isVerified
    ? 'We’ve sent a password reset link to your email. Email should be received within 5 minutes.'
    : 'Enter your email address and we’ll send you instructions to reset your password.';

  const isFormClosed = classNames(styles.container__content__sign_in__block, {
    [styles.container__content__sign_in__block_close]: isVerified,
  });

  const formBtnClasses = classNames({
    [styles.container__content__sign_in__block_btn]: isVerified,
  });

  const formInputClasses = classNames(
    styles.container__content__sign_in__block__input__inp,
    {
      [styles.container__content__sign_in__block__input__inp_close]: isVerified,
    },
  );

  const handleForgotPasswordSubmit = useCallback(
    (values) => {
      dispatch(authActions.updateErrorAndIsVerified);
      dispatch(authActions.forgotPassword(values));
      toggleIsLoading();
    },
    [dispatch],
  );

  useEffect(() => {
    if (error || isVerified) {
      toggleIsLoading();
    }
  }, [error, isVerified, isLoading]);

  return (
    <div className={`container_without-header ${styles.container}`}>
      <Link to={Route.SignIn} className={styles.container__route}>
        Back to sign in
      </Link>
      <div className={styles.container__content}>
        <div className={styles.container__content__top}>
          <LogoIcon className={styles.container__content__top_img} />
          <Typography
            type="Extra"
            variant="Heading"
            className={styles.container__content__top__title}>
            Forgot Password
          </Typography>

          <Typography
            type="Extra"
            variant="Heading"
            className={styles.container__content__top__title_bio}>
            {ifSubmitText}
          </Typography>
        </div>
        <Form
          // ref={forgotPasswordRef}
          form={forgotPasswordForm}
          submitText={ifResetButton}
          labelClassName={isFormClosed}
          inputClassName={formInputClasses}
          addFormBtnClasses={formBtnClasses}
          className={styles.container__content__sign_in}
          labelText={styles.container__content__sign_in__block__text}
          innerClassName={styles.container__content__sign_in__block__input}
          onSubmit={handleForgotPasswordSubmit}
        />
      </div>
      {isLoading && <Loader isVertical />}
    </div>
  );
};

export default ForgotPassword;
