import React, {useRef} from 'react';

import {LogoIcon} from '~/assets';
import {RouterService} from '~/services';
import {Typography, Form} from '~/components';
import {registrationForm, Route} from '~/constants';

import styles from './RegistrationPersonalInformation.module.scss';

const RegistrationPersonalInformation: React.FC = () => {
  const registrationRef = useRef<HTMLFormElement>(null);

  const handlePersonalInformationFormSubmit = () => {
    RouterService.push(Route.RegistrationSetupPassword);
  };

  return (
    <div className="container_without-header">
      <div className={styles.container__top}>
        <LogoIcon className={styles.container__top_img} />
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
          step1Of3
        </Typography>
      </div>

      <Form
        ref={registrationRef}
        submitText="proceed"
        form={registrationForm}
        onSubmit={handlePersonalInformationFormSubmit}
      />
    </div>
  );
};

export default RegistrationPersonalInformation;
