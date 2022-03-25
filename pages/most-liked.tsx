import React from 'react';
import {NextPage} from 'next';

import {Seo, Comments, Pagination} from '~/components';

import {getStaticProps} from './index';

const MostLikedPage: NextPage = () => (
  <Seo title="Most liked page" metaDescription="Most liked page description">
    <Pagination />
    <Comments />
  </Seo>
);

export {getStaticProps};

export default MostLikedPage;
