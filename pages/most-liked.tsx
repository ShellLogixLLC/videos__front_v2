import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

import {getStaticProps} from './categories';

const MostLikedPage: NextPage = () => {
  return (
    <Seo title="Most liked page" metaDescription="Most liked page description">
      <Typography>Most Liked</Typography>
    </Seo>
  );
};

export {getStaticProps};

export default MostLikedPage;
