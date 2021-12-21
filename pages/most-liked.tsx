import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

const MostLikedPage: NextPage = () => (
  <Seo title="Most liked page" metaDescription="Most liked page description">
    <Typography tagName="div" align="right" variant="Text">
      CATEGORY
    </Typography>
  </Seo>
);

export default MostLikedPage;
