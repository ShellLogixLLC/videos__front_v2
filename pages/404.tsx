import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';

import {getStaticProps} from './index';

const ErrorPage: NextPage = () => (
  <Seo title="Error page" showHeaderFooter={false} metaDescription="Error page">
    404
  </Seo>
);

export {getStaticProps};

export default ErrorPage;
