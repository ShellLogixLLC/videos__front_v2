import React from 'react';
import {NextPage} from 'next';

import {Seo, VideoDescription} from '~/components';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <VideoDescription />
  </Seo>
);

export default HomePage;
