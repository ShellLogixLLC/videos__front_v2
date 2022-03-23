import React from 'react';
import {NextPage} from 'next';

import {filteredMass} from '~/utils';
import {Seo, Filter} from '~/components';

import {getStaticProps} from './index';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <Filter options={filteredMass} />
  </Seo>
);

export {getStaticProps};

export default NewPage;
