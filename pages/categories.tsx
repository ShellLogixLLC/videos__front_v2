import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

import {getStaticProps} from './index';

const CategoriesPage: NextPage = () => (
  <Seo title="Categories page" metaDescription="Categories page description">
    <Typography>Categoriess</Typography>
  </Seo>
);

export {getStaticProps};

export default CategoriesPage;
