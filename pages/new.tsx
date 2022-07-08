import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <Typography>New</Typography>
  </Seo>
);

export default NewPage;
