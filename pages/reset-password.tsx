import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {pageRedirect} from '~/utils';
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

  pageRedirect(token, ctx);

  return {
    props: {},
  };
};

export default ResetPasswordPage;
