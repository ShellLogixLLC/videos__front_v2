import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

const MostLikedPage: NextPage = () => {
  return (
    <Seo title="Most liked page" metaDescription="Most liked page description">
      <Typography>mostLiked</Typography>
    </Seo>
  );
};

export default MostLikedPage;
