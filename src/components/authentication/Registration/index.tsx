import React, {useCallback} from 'react';

import {Loader} from '~/components';
import {LogoIcon} from '~/assets';
import {LoadingStates} from '~/store/types';
import {registrationForm} from '~/constants';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector, useLocales} from '~/hooks';

import Form from '../../shared/forms/Form';
import BackButton from '../../shared/BackButton';
import Typography from '../../shared/Typography';

import styles from './Registration.module.scss';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const {registerLoading} = useAppSelector(authSelect);

  const {translatedTypo} = useLocales('cancelRegistration');

  const handleRegistrationSubmit = useCallback(
    (values) => {
      const {email, username, create_password, confirm_password, verification} =
        values;

      const userInfo = {
        username,
        password: create_password,
        passwordConfirmation: confirm_password,
        verification,
      };

      dispatch(authActions.register(email ? {...userInfo, email} : userInfo));
    },
    [dispatch],
  );

  return (
    <div className={`container_without-header ${styles.container}`}>
      <BackButton
        text={translatedTypo || ''}
        className={styles.container__cancel}
      />
      <LogoIcon className={styles.container__top_img} />
      <Typography
        type="Extra"
        variant="Heading"
        className={styles.container__top__title}>
        registration
      </Typography>
      <Form
        submitText="proceed"
        form={registrationForm}
        onSubmit={handleRegistrationSubmit}
        labelClassName={styles.container__registration__block}
        innerClassName={styles.container__registration__block__input}
        inputClassName={styles.container__registration__block__input__inp}
      />
      {registerLoading === LoadingStates.LOADING && <Loader isVertical />}
    </div>
  );
};

export default Registration;
