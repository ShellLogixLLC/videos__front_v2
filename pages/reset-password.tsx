import React from 'react';
import {NextPage} from 'next';

import {Seo, ResetPassword} from '~/components';

import {getStaticProps} from './_app';

const ResetPasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Reset password page"
    metaDescription="Reset password page description">
    <ResetPassword />
  </Seo>
);

export {getStaticProps};

export default ResetPasswordPage;
