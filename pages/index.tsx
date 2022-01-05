import React from 'react';
import {NextPage} from 'next';

import {Seo, Comments} from '~/components';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <Comments />
  </Seo>
);

export default HomePage;
