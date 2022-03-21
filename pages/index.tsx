import React from 'react';
import {NextPage} from 'next';

import {Seo, Loader} from '~/components';

import {getStaticProps} from './_app';

const HomePage: NextPage = () => (
  <Seo title="Home page" metaDescription="Home page description">
    <Loader />
    <Loader isVertical />
  </Seo>
);

export {getStaticProps};

export default HomePage;
