import React, {useRef} from 'react';

import {Logo} from '~/assets';
import {RouterService} from '~/services';
import {Typography, Form} from '~/components';
import {setPasswordForm, Route} from '~/constants';

import styles from './RegistrationSetupPassword.module.scss';

const RegistrationSetupPassword: React.FC = () => {
  const registrationSetupPasswordRef = useRef<HTMLFormElement>(null);

  const handlePasswordFormSubmit = () => {
    RouterService.push(Route.RegistrationContactInformation);
  };

  return (
    <div className="container_without-header">
      <div className={styles.container__top}>
        <Logo className={styles.container__top_img} />
        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title}>
          registration
        </Typography>
        <Typography
          type="Medium"
          variant="Text"
          className={styles.container__top__step}>
          step3SetUpPassword
        </Typography>
      </div>

      <Form
        submitText="Register"
        form={setPasswordForm}
        ref={registrationSetupPasswordRef}
        onSubmit={handlePasswordFormSubmit}
      />
    </div>
  );
};

export default RegistrationSetupPassword;
