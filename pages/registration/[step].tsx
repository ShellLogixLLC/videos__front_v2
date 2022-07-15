import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {ctxRedirect} from '~/utils';
import {RouterService} from '~/services';
import {IRegistrationStepsPageProps} from '~/types';
import {IS_SERVER, registrationSteps, Route} from '~/constants';
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

  if (token) {
    if (IS_SERVER) {
      ctxRedirect(ctx, Route.Error);
    } else {
      RouterService.push(Route.Error);
    }
  }

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
