import React, {useCallback, useEffect} from 'react';
import classNames from 'classnames';
import {useToggle} from 'react-use';

import {LogoIcon} from '~/assets';
import {Route} from '~/constants';
import {Loader} from '~/components';
import {forgotPasswordForm} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector, useLocales} from '~/hooks';

import Link from '../../shared/Link';
import Form from '../../shared/forms/Form';
import Typography from '../../shared/Typography';

import styles from './ForgotPassword.module.scss';

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const {error, isVerified} = useAppSelector(authSelect);

  const [isLoading, toggleIsLoading] = useToggle(false);

  const ifResetButton = isVerified ? 'resendLink' : 'resetPassword';

  const {translatedTypo} = useLocales(ifResetButton);

  const ifSubmitText = isVerified
    ? 'weHaveSentPasswordResetLink'
    : 'enterYourEmailAddressAndWeWillSendInstructions';

  const isFormClosed = classNames(styles.container__content__sign_in__block, {
    [styles.container__content__sign_in__block_close]: isVerified,
  });

  const formBtnClasses = classNames(
    styles.container__content__sign_in__block_btn,
    {
      [styles.container__content__sign_in__block_btn__verifiied]: isVerified,
    },
  );

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
        <Typography>backToSignIn</Typography>
      </Link>
      <div className={styles.container__content}>
        <div className={styles.container__content__top}>
          <Link to={Route.Home}>
            <LogoIcon className={styles.container__content__top_img} />
          </Link>
          <Typography
            type="Extra"
            variant="Heading"
            className={styles.container__content__top__title}>
            forgotPassword
          </Typography>

          <Typography
            type="Extra"
            variant="Heading"
            className={styles.container__content__top__title_bio}>
            {ifSubmitText}
          </Typography>
        </div>
        <Form
          form={forgotPasswordForm}
          submitText={translatedTypo || ''}
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
