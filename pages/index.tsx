import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {SignIn, ForgotPassword} from '~/containers';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <SignIn />
    <ForgotPassword />
  </Seo>
);

export default HomePage;
