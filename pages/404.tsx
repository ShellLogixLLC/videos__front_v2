import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

const ErrorPage: NextPage = () => {
  return (
    <Seo
      title="Error page"
      showHeader={false}
      showFooter={false}
      metaDescription="Error page">
      404
    </Seo>
  );
};

export default ErrorPage;
