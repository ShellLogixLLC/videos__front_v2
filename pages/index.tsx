import React from 'react';
import {NextPage} from 'next';

import {
  Seo,
  Comments,
  //  VideoItem
} from '~/components';
import {SignIn, ForgotPassword} from '~/containers';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    {/* <VideoItem /> */}
    <Comments />
    <SignIn />
    <ForgotPassword />
  </Seo>
);

export default HomePage;
