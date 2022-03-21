import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

import {getStaticProps} from './_app';

const Terms: NextPage = () => (
  <Seo title="Terms of services" metaDescription="New page description" />
);

export {getStaticProps};

export default Terms;
