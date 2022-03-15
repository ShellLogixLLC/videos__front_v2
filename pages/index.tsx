import React from 'react';
import {NextPage} from 'next';

import {Seo, Loader} from '~/components';

// Temporary

const HomePage: NextPage = () => {
  return (
    <Seo title="Home page" metaDescription="Home page description">
      <Loader />
      <Loader isVertical />
    </Seo>
  );
};

export default HomePage;
