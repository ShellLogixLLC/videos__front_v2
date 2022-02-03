import React from 'react';

import {Seo} from '~/components';
import {VerifyPage} from '~/containers';

const HomePage: React.FC = () => (
  <Seo
    title="Home page"
    showHeaderFooter={false}
    metaDescription="Home page description">
    <VerifyPage />
  </Seo>
);

export default HomePage;
