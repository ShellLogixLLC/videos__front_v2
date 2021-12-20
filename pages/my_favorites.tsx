import React from 'react';
import {NextPage} from 'next';

import {Seo, FilmCard} from '~/components';

const HomePage: NextPage = () => {
  return (
    <Seo title="Home page" metaDescription="Home page description">
      <FilmCard
        globalTime="05:00"
        filmName="HHH"
        descriptionText="COOL"
        uploadDate="21/21/12"
      />
    </Seo>
  );
};

export default HomePage;
