import React from 'react';

import {Seo, ResetPassword} from '~/components';

const ResetPasswordPage: React.FC = () => (
  <Seo
    showHeaderFooter={false}
    title="Reset password page"
    metaDescription="Reset password page description">
    <ResetPassword />
  </Seo>
);

export default ResetPasswordPage;
