import React from 'react';
import {NextPage} from 'next';

import {Seo, CategoryNav} from '~/components';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <CategoryNav />
  </Seo>
);

export default HomePage;
