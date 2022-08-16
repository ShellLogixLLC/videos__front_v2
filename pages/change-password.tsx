import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {Seo, ChangePassword} from '~/components';
import {EmptyProps, getProtectedPageRedirect, LocaleKeys} from '~/constants';

const ChangePasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Change password page"
    metaDescription="Change password page description">
    <ChangePassword />
  </Seo>
);

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<{}>> => {
  const {locale, req} = ctx;
  const token = getCookie('token', req.headers.cookie as string);

  return !token ? getProtectedPageRedirect(locale as LocaleKeys) : EmptyProps;
};

export default ChangePasswordPage;
