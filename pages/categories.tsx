import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

const HomePage: NextPage = () => {
  return (
    <Seo title="Home page" metaDescription="Home page description">
      CATEGORY
    </Seo>
  );
};

export default HomePage;
