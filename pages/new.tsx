import React from 'react';
import {NextPage} from 'next';

import {AlarmIcon} from '~/assets';
import {filteredMass} from '~/utils';
import {Seo, Filter} from '~/components';

import {getStaticProps} from './index';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <Filter filterTitle="FILTER" IconProp={AlarmIcon} options={filteredMass} />
  </Seo>
);

export {getStaticProps};

export default NewPage;
