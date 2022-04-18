import React from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Seo, Typography} from '~/components';

const CategoriesPage: NextPage = () => {
  const router = useRouter();
  console.log(router, 'router');

  return (
    <Seo title="Categories page" metaDescription="Categories page description">
      <Typography>Categories Name</Typography>
    </Seo>
  );
};

export default CategoriesPage;
