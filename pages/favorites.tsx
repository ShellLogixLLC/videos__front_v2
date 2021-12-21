import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

const FavoritesPage: NextPage = () => (
  <Seo title="Favorites page" metaDescription="Favorites page description">
    <Typography tagName="div" align="right" variant="Text">
      CATEGORY
    </Typography>
  </Seo>
);

export default FavoritesPage;
