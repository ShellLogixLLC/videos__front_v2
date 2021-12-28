import React from 'react';
import {NextPage} from 'next';

import {Seo, Button} from '~/components';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <Button>PPP</Button>
  </Seo>
);

export default HomePage;
