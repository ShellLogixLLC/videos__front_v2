import React, {useRef, useCallback, useState, useContext} from 'react';
import classNames from 'classnames';
import {toast} from 'react-toastify';
// import usePortal from 'react-useportal';

import {Logo} from '~/assets';
import {Route} from '~/constants';
import {ModalContext} from '~/context';
import {forgotPasswordForm} from '~/constants';

import Link from '../../shared/Link';
import Form from '../../shared/forms/Form';
import Typography from '../../shared/Typography';

import Modal from './modal';
import styles from './ForgotPassword.module.scss';

const ForgotPassword: React.FC = () => {
  const {openModal} = useContext(ModalContext);

  const forgotPasswordRef = useRef<any>(null);

  const [isValid, setIsValid] = useState<string>('');

  const handleForgotPasswordSubmit = useCallback((values) => {
    setIsValid(values);
    openModal(<Modal />);
    toast.dark(<p className={styles.toast_style}>You are not registered</p>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeHome = Route.SignIn;

  const isEmpty = isValid !== '';

  const ifResetButton = isEmpty ? 'Resend link' : 'Reset Password';

  const ifSubmitText = isEmpty
    ? 'We’ve sent a password reset link to your email. Email should be received within 5 minutes.'
    : 'Enter your email address and we’ll send you instructions to reset your password.';

  const isCloseForm = classNames(styles.container__content__sign_in__block, {
    [styles.container__content__sign_in__block_close]: isEmpty,
  });

  const formBtnClasses = classNames({
    [styles.container__content__sign_in__block_btn]: isEmpty,
  });

  const formInputClasses = classNames(
    styles.container__content__sign_in__block__input__inp,
    {
      [styles.container__content__sign_in__block__input__inp_close]: isEmpty,
    },
  );

  return (
    <div className={`container_without-header ${styles.container}`}>
      <Link to={routeHome} className={styles.container__route}>
        Back to sign in
      </Link>
      <div className={styles.container__content}>
        <div className={styles.container__content__top}>
          <Logo className={styles.container__content__top_img} />
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
          ref={forgotPasswordRef}
          form={forgotPasswordForm}
          submitText={ifResetButton}
          labelClassName={isCloseForm}
          inputClassName={formInputClasses}
          addFormBtnClasses={formBtnClasses}
          className={styles.container__content__sign_in}
          labelText={styles.container__content__sign_in__block__text}
          innerClassName={styles.container__content__sign_in__block__input}
          onSubmit={handleForgotPasswordSubmit}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
