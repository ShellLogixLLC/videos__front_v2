import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {Category} from '~/containers';

import {getStaticProps} from './index';

const CategoriesPage: NextPage = () => (
  <Seo title="Categories page" metaDescription="Categories page description">
    <Category />
  </Seo>
);

export {getStaticProps};

export default CategoriesPage;
