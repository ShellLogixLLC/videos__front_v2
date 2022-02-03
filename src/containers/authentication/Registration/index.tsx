import React, {useCallback, useRef} from 'react';

import {Logo} from '~/assets';
import {registrationForm} from '~/constants';
import {Form, BackButton, Typography} from '~/components';

import styles from './Registration.module.scss';

const Registration: React.FC = () => {
  const signInRef = useRef<any>(null);

  const handleResetPassFormSubmit = useCallback((values) => {
    // dispatch(authActions.login(values));
    // eslint-disable-next-line no-console
    console.log(values, 'signIn');
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
        ref={signInRef}
        submitText="Proceed"
        form={registrationForm}
        onSubmit={handleResetPassFormSubmit}
        //
        // className={styles.container__registration}
        // addFormBtnClasses={styles.register_button}
        labelClassName={styles.container__registration__block}
        innerClassName={styles.container__registration__block__input}
        inputClassName={styles.container__registration__block__input__inp}
      />
    </div>
  );
};

export default Registration;
