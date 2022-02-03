import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

const Privacy: NextPage = () => (
  <Seo
    title="Privacy policy"
    showHeaderFooter={false}
    metaDescription="New page description"></Seo>
);

export default Privacy;
