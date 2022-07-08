import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {Error} from '~/containers';

const ErrorPage: NextPage = () => (
  <Seo title="Error page" showHeaderFooter={false} metaDescription="Error page">
    <Error />
  </Seo>
);

export default ErrorPage;
