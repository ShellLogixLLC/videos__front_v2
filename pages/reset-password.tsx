import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {Seo, ResetPassword} from '~/components';
import {EmptyProps, getProtectedPageRedirect, LocaleKeys} from '~/constants';

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
  const {locale, req} = ctx;
  const token = getCookie('token', req.headers.cookie as string);

  return token ? getProtectedPageRedirect(locale as LocaleKeys) : EmptyProps;
};

export default ResetPasswordPage;
