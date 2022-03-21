import React from 'react';
import {NextPage} from 'next';

import {
  Seo,
  CreepingLine,
  FireAnimation,
  CreepingLineForText,
} from '~/components';

import {getStaticProps} from './_app';

const MyFavoritesPage: NextPage = () => (
  <Seo
    title="My favorites page"
    metaDescription="My favorites page description">
    <FireAnimation count={100} width="100%">
      <CreepingLineForText text="QWERTYU Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia molestiae pariatur harum aliquid porro aperiam id, fugit inventore expedita accusantium reprehenderit qui, officiis tempora ad, excepturi cum est velit dolorem.QWERTYU Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia molestiae pariatur harum aliquid porro aperiam id, fugit" />
    </FireAnimation>
    <FireAnimation count={100} width="100%">
      <CreepingLine />
    </FireAnimation>
  </Seo>
);

export {getStaticProps};

export default MyFavoritesPage;
