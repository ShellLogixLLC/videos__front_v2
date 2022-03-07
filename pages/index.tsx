import React from 'react';
import {NextPage} from 'next';

import {Seo, Loader} from '~/components';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <Loader isVertical />
  </Seo>
);

export default HomePage;
