import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {pageRedirect} from '~/utils';
import {registrationSteps} from '~/constants';
import {IRegistrationStepsPageProps} from '~/types';
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
  const step = ctx.params?.step;
  const parsedStep = Number(step) - 1;

  const token = getCookie('token', ctx.req.headers.cookie as string);

  await pageRedirect(!!token, ctx);

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
