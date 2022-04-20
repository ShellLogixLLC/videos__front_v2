import React from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Seo, Typography} from '~/components';

const CategoriesPage: NextPage = () => {
  const {query} = useRouter();

  return (
    <Seo title="Categories page" metaDescription="Categories page description">
      <Typography>Categories {query.name}</Typography>
    </Seo>
  );
};

export default CategoriesPage;
