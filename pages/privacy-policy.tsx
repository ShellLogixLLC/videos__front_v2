import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

import {getStaticProps} from './categories';

const Privacy: NextPage = () => (
  <Seo title="Privacy policy" metaDescription="New page description" />
);

export {getStaticProps};

export default Privacy;
