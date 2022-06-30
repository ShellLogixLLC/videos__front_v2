import React, {useCallback, useEffect} from 'react';
import {useToggle} from 'react-use';

import {Logo} from '~/assets';
import {Loader} from '~/components';
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

  const [isLoading, toggleIsLoading] = useToggle(false);

  const handleRegistrationSubmit = useCallback(
    (values) => {
      const {email, username, create_password, confirm_password, verification} =
        values;

      const userInfo = {
        email,
        username,
        password: create_password,
        passwordConfirmation: confirm_password,
        verification,
      };

      dispatch(authActions.register(userInfo));
      toggleIsLoading();
    },
    [dispatch],
  );

  useEffect(() => {
    if (error) toggleIsLoading();
  }, [isLoading, error]);

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
        onSubmit={handleRegistrationSubmit}
        labelClassName={styles.container__registration__block}
        innerClassName={styles.container__registration__block__input}
        inputClassName={styles.container__registration__block__input__inp}
      />
      {isLoading && <Loader isVertical />}
    </div>
  );
};

export default Registration;
