import React from 'react';
import {NextPage} from 'next';

import {Seo, FilmCard} from '~/components';

const MyFavoritesPage: NextPage = () => {
  return (
    <Seo
      title="My favorites page"
      metaDescription="My favorites page description">
      <FilmCard
        globalTime="05:00"
        filmName="HHH"
        descriptionText="COOL"
        uploadDate="21/21/12"
      />
    </Seo>
  );
};

export default MyFavoritesPage;
