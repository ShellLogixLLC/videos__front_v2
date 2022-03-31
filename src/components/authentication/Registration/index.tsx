import React, {useCallback} from 'react';

import {Logo} from '~/assets';
import {RouterService} from '~/services';
import {registrationForm, Route} from '~/constants';
import {authActions} from '~/store/auth';
import {useAppDispatch} from '~/hooks';

import Form from '../../shared/forms/Form';
import BackButton from '../../shared/BackButton';
import Typography from '../../shared/Typography';

import styles from './Registration.module.scss';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleResetPassFormSubmit = useCallback((values) => {
    const {email, username, create_password, confirm_password, verification} =
      values;

    const userInfo = {
      email,
      username,
      password: create_password,
      passwordConfirmation: confirm_password,
    };

    dispatch(authActions.register(userInfo));
    if (verification) {
      RouterService.push(Route.RegistrationSetupPassword);
    } else {
      RouterService.push(Route.Home);
    }
  }, []);

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
    </div>
  );
};

export default Registration;
