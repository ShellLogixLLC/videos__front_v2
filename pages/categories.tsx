import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

const CategoriesPage: NextPage = () => (
  <Seo title="Categories page" metaDescription="Categories page description">
    <Typography>categories</Typography>
  </Seo>
);

export default CategoriesPage;
