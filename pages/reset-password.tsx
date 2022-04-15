import React from 'react';
import {NextPage} from 'next';

import {Seo, ResetPassword} from '~/components';

import {getStaticProps} from './categories';

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
