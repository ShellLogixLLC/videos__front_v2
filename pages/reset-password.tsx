import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {ctxRedirect} from '~/utils';
import {RouterService} from '~/services';
import {IS_SERVER, Route} from '~/constants';
import {Seo, ResetPassword} from '~/components';

const ResetPasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Reset password page"
    metaDescription="Reset password page description">
    <ResetPassword />
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

export default ResetPasswordPage;
