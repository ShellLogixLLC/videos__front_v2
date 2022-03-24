import React, {useState} from 'react';
import {NextPage} from 'next';

import {Seo, Comments, Pagination, VideoDescription} from '~/components';
import {
  INITIAL_PAGINATION_DATA_LENGTH,
  INITIAL_PAGINATION_ACTIVE_PAGE,
} from '~/constants';

const MostLikedPage: NextPage = () => {
  const [activePage, setActivePage] = useState<number>(
    INITIAL_PAGINATION_ACTIVE_PAGE,
  );

  return (
    <Seo title="Most liked page" metaDescription="Most liked page description">
      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        dataLength={INITIAL_PAGINATION_DATA_LENGTH}
      />

      <Pagination isRight dataLength={INITIAL_PAGINATION_DATA_LENGTH} />
      <Comments />
      <VideoDescription />
    </Seo>
  );
};

export default MostLikedPage;
