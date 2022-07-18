import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {Seo} from '~/components';
import {getCookie} from '~/libraries';
import {pageRedirect} from '~/utils';
import {ForgotPassword} from '~/components';

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

  pageRedirect(token, ctx);

  return {
    props: {},
  };
};

export default ForgotPasswordPage;
