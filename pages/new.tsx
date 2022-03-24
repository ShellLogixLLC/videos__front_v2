import React from 'react';
import {NextPage} from 'next';

import {filteredMass} from '~/utils';
import {Seo, FilterBySort} from '~/components';

import {getStaticProps} from './index';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <FilterBySort options={filteredMass} />
  </Seo>
);

export {getStaticProps};

export default NewPage;
