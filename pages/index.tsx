import React from 'react';
import {NextPage} from 'next';

import {Seo, Loader, DatePicker} from '~/components';

const HomePage: NextPage = () => {
  return (
    <Seo title="Home page" metaDescription="Home page description">
      <Loader />
      <DatePicker />
    </Seo>
  );
};

export default HomePage;
