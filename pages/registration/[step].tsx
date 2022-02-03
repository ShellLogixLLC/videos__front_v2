import {GetServerSidePropsResult, NextPage} from 'next';
import React from 'react';

import {
  IRegistrationStepsPageProps,
  IRegistrationStepsPageParams,
} from '~/types';
import {Seo} from '~/components';
import {registrationSteps} from '~/constants';
import {
  RegistrationSetupPasswordContainer,
  RegistrationContactInformationContainer,
  RegistrationPersonalInformationContainer,
} from '~/containers';

export const RegistrationContainers = {
  RegistrationSetupPasswordContainer,
  RegistrationContactInformationContainer,
  RegistrationPersonalInformationContainer,
};

const RegistrationStepPage: NextPage<IRegistrationStepsPageProps> = ({
  step,
}) => {
  const {title, metaDescription, containerComponent} = registrationSteps[step];
  const ContainerComponent = RegistrationContainers[containerComponent];

  return (
    <Seo
      title={title}
      showHeaderFooter={false}
      metaDescription={metaDescription}>
      <ContainerComponent />
    </Seo>
  );
};

export const getServerSideProps = async ({
  params: {step},
}: IRegistrationStepsPageParams): Promise<
  GetServerSidePropsResult<IRegistrationStepsPageProps>
> => {
  const parsedStep = Number(step) - 1;

  if (!registrationSteps[parsedStep]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      step: parsedStep,
    },
  };
};

export default RegistrationStepPage;
