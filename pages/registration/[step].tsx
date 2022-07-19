import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {IRegistrationStepsPageProps} from '~/types';
import {
  LocaleKeys,
  registrationSteps,
  getProtectedPageRedirect,
} from '~/constants';
import {
  Seo,
  VerifyPage,
  Registration,
  ResetPassword,
  ForgotPassword,
} from '~/components';

export const RegistrationContainers = {
  VerifyPage,
  Registration,
  ResetPassword,
  ForgotPassword,
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

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<IRegistrationStepsPageProps>> => {
  const {locale, req, params} = ctx;
  const step = params?.step;
  const parsedStep = Number(step) - 1;

  const token = getCookie('token', req.headers.cookie as string);

  if (!registrationSteps[parsedStep]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return token
    ? getProtectedPageRedirect(locale as LocaleKeys)
    : {
        props: {
          step: parsedStep,
        },
      };
};

export default RegistrationStepPage;
