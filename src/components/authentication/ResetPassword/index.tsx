import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useToggle} from 'react-use';

import {Logo} from '~/assets';
import {Loader} from '~/components';
import {resetForm} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Form from '../../shared/forms/Form';
import Typography from '../../shared/Typography';

import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
  const {query} = useRouter();
  const dispatch = useAppDispatch();
  const {isVerified, error} = useAppSelector(authSelect);

  const [isLoading, toggleIsLoading] = useToggle(false);

  useEffect(() => {
    if (isLoading && (isVerified || error)) toggleIsLoading();
  }, [isLoading, isVerified, error]);

  const handleResetPassFormSubmit = useCallback(
    (values) => {
      const {new_password, allow_password} = values;
      const newPasswordData = {
        token: query.token as string,
        password: new_password,
        resetTokenId: query.resetTokenId as string,
        passwordConfirmation: allow_password,
      };

      dispatch(authActions.updateErrorAndIsVerified);
      dispatch(authActions.resetPassword(newPasswordData));
      toggleIsLoading();
    },
    [dispatch, query],
  );

  return (
    <div className={`container_without-header ${styles.container}`}>
      <Logo className={styles.container__top_img} />
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        Reset Password
      </Typography>
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__subtitle}>
        Enter your new password
      </Typography>
      <Form
        form={resetForm}
        className={styles.reset}
        inputClassName={styles.reset__block__input__inp}
        labelClassName={styles.reset__block}
        innerClassName={styles.reset__block__input}
        submitText="Reset Password"
        onSubmit={handleResetPassFormSubmit}
      />
      {isLoading && <Loader isVertical />}
    </div>
  );
};

export default ResetPassword;
