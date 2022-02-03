import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

const NewPage: NextPage = () => (
  <Seo
    title="New page"
    showHeaderFooter={false}
    metaDescription="New page description"></Seo>
);

export default NewPage;
