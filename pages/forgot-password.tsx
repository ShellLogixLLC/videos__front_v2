import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {ForgotPassword} from '~/components';

import {getStaticProps} from './_app';

const ForgotPasswordPage: NextPage = () => (
  <Seo
    showHeaderFooter={false}
    title="Forgot password page"
    metaDescription="Forgot password page description">
    <ForgotPassword />
  </Seo>
);

export {getStaticProps};

export default ForgotPasswordPage;
