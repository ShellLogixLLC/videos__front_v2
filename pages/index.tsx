import React from 'react';

import {Seo, SignIn, Registration} from '~/components';

const HomePage: React.FC = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <SignIn />
    <Registration />
  </Seo>
);

export default HomePage;
