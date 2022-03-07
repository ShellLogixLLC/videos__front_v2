import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {ForgotPassword} from '~/components';

const ForgotPasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Forgot password page"
    metaDescription="Forgot password page description">
    <ForgotPassword />
  </Seo>
);

export default ForgotPasswordPage;
