import React from 'react';
import {NextPage} from 'next';

import {Seo, Comments, Pagination, VideoDescription} from '~/components';

import {getStaticProps} from './_app';

const MostLikedPage: NextPage = () => (
  <Seo title="Most liked page" metaDescription="Most liked page description">
    <Pagination />
    <Comments />
    <VideoDescription />
  </Seo>
);

export {getStaticProps};

export default MostLikedPage;
