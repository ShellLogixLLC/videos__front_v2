import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {ActiveCategoryContainer} from '~/containers';

const ActiveCategory: NextPage = () => {
  return (
    <Seo
      title="Active category page"
      metaDescription="Active category description">
      <ActiveCategoryContainer />
    </Seo>
  );
};

export default ActiveCategory;
