import React, {useCallback} from 'react';
import {useRouter} from 'next/router';

import {LogoIcon} from '~/assets';
import {Link, Loader} from '~/components';
import {LoadingStates} from '~/store/types';
import {resetForm, Route} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Form from '../../shared/forms/Form';
import Typography from '../../shared/Typography';

import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
  const {query} = useRouter();
  const dispatch = useAppDispatch();
  const {resetPasswordLoading} = useAppSelector(authSelect);

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
    },
    [dispatch, query],
  );

  return (
    <div className={`container_without-header ${styles.container}`}>
      <Link to={Route.Home}>
        <LogoIcon className={styles.container__top_img} />
      </Link>
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        resetPassword
      </Typography>
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__subtitle}>
        enterNewPassword
      </Typography>
      <Form
        form={resetForm}
        className={styles.reset}
        inputClassName={styles.reset__block__input__inp}
        labelClassName={styles.reset__block}
        innerClassName={styles.reset__block__input}
        submitText="resetPassword"
        onSubmit={handleResetPassFormSubmit}
      />
      {resetPasswordLoading === LoadingStates.LOADING && <Loader isVertical />}
    </div>
  );
};

export default ResetPassword;
