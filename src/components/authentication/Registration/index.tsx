import React, {useCallback, useMemo} from 'react';
import {toast} from 'react-toastify';

import {Logo} from '~/assets';
import {registrationForm} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';

import Form from '../../shared/forms/Form';
import BackButton from '../../shared/BackButton';
import Typography from '../../shared/Typography';

import styles from './Registration.module.scss';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(authSelect);

  const handleResetPassFormSubmit = useCallback((values) => {
    const {email, username, create_password, confirm_password} = values;

    const userInfo = {
      email,
      username,
      password: create_password,
      passwordConfirmation: confirm_password,
    };

    dispatch(authActions.register(userInfo));
  }, []);

  const renderBackendErrors = useMemo(
    () =>
      error !== null &&
      error.map((el: any, idx: number) => {
        const val = Object.values(el);
        toast.dark(
          <p key={idx} className={styles.toast_style}>
            {val}
          </p>,
        );
      }),
    [error],
  );

  return (
    <div className={`container_without-header ${styles.container}`}>
      <BackButton
        text="Cancel registration"
        className={styles.container__cancel}
      />
      <Logo className={styles.container__top_img} />
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        Registration
      </Typography>
      <Form
        // ref={signInRef}
        submitText="Proceed"
        form={registrationForm}
        onSubmit={handleResetPassFormSubmit}
        labelClassName={styles.container__registration__block}
        innerClassName={styles.container__registration__block__input}
        inputClassName={styles.container__registration__block__input__inp}
      />
      {renderBackendErrors}
    </div>
  );
};

export default Registration;
