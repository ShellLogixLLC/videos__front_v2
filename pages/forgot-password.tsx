import React from 'react';

import {Seo} from '~/components';
import {ForgotPassword} from '~/components';

const ForgotPasswordPage: React.FC = () => (
  <Seo
    showHeaderFooter={false}
    title="Forgot password page"
    metaDescription="Forgot password page description">
    <ForgotPassword />
  </Seo>
);

export default ForgotPasswordPage;
