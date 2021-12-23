import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description"></Seo>
);

export default HomePage;
