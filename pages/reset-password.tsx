import React from 'react';
import {NextPage} from 'next';

import {Seo, ResetPassword} from '~/components';

const ResetPasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Reset password page"
    metaDescription="Reset password page description">
    <ResetPassword />
  </Seo>
);

export default ResetPasswordPage;
