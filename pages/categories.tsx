import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {CategoryList} from '~/containers';

const CategoriesPage: NextPage = () => {
  return (
    <Seo title="Categories page" metaDescription="Categories page description">
      <CategoryList />
    </Seo>
  );
};

export default CategoriesPage;
