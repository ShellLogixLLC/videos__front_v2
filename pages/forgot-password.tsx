import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {Seo} from '~/components';
import {getCookie} from '~/libraries';
import {ctxRedirect} from '~/utils';
import {RouterService} from '~/services';
import {ForgotPassword} from '~/components';
import {IS_SERVER, Route} from '~/constants';

const ForgotPasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Forgot password page"
    metaDescription="Forgot password page description">
    <ForgotPassword />
  </Seo>
);

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<{}>> => {
  const token = getCookie('token', ctx.req.headers.cookie as string);

  if (token) {
    if (IS_SERVER) {
      ctxRedirect(ctx, Route.Error);
    } else {
      RouterService.push(Route.Error);
    }
  }
  return {
    props: {},
  };
};

export default ForgotPasswordPage;
