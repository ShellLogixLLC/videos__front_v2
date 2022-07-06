import React, {useRef} from 'react';

import {LogoIcon} from '~/assets';
import {Typography, Form} from '~/components';
import {Route, setEmailForm} from '~/constants';
import {RouterService} from '~/services';

import styles from './RegistrationContactInformation.module.scss';

const RegistrationContactInformation: React.FC = () => {
  const emailRef = useRef<HTMLFormElement>(null);

  const handlePasswordFormSubmit = () => {
    RouterService.push(Route.RegistrationContactInformation);
  };

  return (
    <div className="container_without-header">
      <div className={styles.container__top}>
        <LogoIcon className={styles.container__top_img} />
        <Typography
          type="Extra"
          variant="Heading"
          className={styles.container__top__title}>
          Registration
        </Typography>
        <Typography
          type="Medium"
          variant="Text"
          className={styles.container__top__step}>
          Step 2. Enter your email
        </Typography>
      </div>

      <Form
        ref={emailRef}
        form={setEmailForm}
        submitText="Proceed"
        onSubmit={handlePasswordFormSubmit}
      />
    </div>
  );
};

export default RegistrationContactInformation;
