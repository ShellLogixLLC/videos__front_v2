import React from 'react';
import {NextPage} from 'next';

import {FilterLamp} from '~/assets';
import {filteredMass} from '~/utils';
import {
  Seo,
  Filter,
  FilmCard,
  CategoryCard,
  FireAnimation,
  CreepingLineForText,
} from '~/components';

const HomePage: NextPage = () => {
  return (
    <Seo title="Home page" metaDescription="Home page description">
      <Filter
        filterTitle="Sort By"
        options={filteredMass}
        iconProp={<FilterLamp />}
      />
      <FilmCard
        globalTime="05:00"
        filmName="HHH"
        descriptionText="COOL"
        uploadDate="21/21/12"
      />
      <CategoryCard>Name</CategoryCard>
      <FireAnimation width="100%" count={105}>
        <CreepingLineForText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          esse, alias corrupti dignissimos, minima illum pariatur nesciunt totam
          fugit, repellat asperiores veniam laudantium quaerat ipsum et laborum
          molestiae libero sequi!
        </CreepingLineForText>
      </FireAnimation>
    </Seo>
  );
};

export default HomePage;
