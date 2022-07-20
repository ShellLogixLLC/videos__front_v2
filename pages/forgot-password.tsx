import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {Seo} from '~/components';
import {getCookie} from '~/libraries';
import {ForgotPassword} from '~/components';
import {EmptyProps, getProtectedPageRedirect, LocaleKeys} from '~/constants';

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
  const {locale, req} = ctx;
  const token = getCookie('token', req.headers.cookie as string);

  return token ? getProtectedPageRedirect(locale as LocaleKeys) : EmptyProps;
};

export default ForgotPasswordPage;
