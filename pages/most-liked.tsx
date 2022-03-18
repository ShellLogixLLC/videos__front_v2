import React, {useState} from 'react';
import {NextPage} from 'next';

import {Seo, Comments, Pagination} from '~/components';

import {getStaticProps} from './index';

<<<<<<< HEAD
const MostLikedPage: NextPage = () => (
  <Seo title="Most liked page" metaDescription="Most liked page description">
    <Pagination />
    <Comments />
  </Seo>
);
=======
const MostLikedPage: NextPage = () => {
  const [activePage, setActivePage] = useState<number>(5);

  return (
    <Seo title="Most liked page" metaDescription="Most liked page description">
      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        dataLength={30}
      />

      <Pagination isRigh dataLength={30} />
      <Comments />
      <VideoDescription />
    </Seo>
  );
};
>>>>>>> #SHELL-15 feat(Pagination-Responsive): 1)Pagination in tablet mode(with more button) and 2)Pagination in mobile mode(with arrows)

export {getStaticProps};

export default MostLikedPage;
