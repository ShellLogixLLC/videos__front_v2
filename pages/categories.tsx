import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {Category} from '~/containers';

const CategoriesPage: NextPage = () => (
  <Seo title="Categories page" metaDescription="Categories page description">
    <Category />
  </Seo>
);

export default CategoriesPage;
