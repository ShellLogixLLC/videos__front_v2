import React from 'react';
import {NextPage} from 'next';

import {Seo} from '~/components';
import {Error} from '~/containers';

import {getStaticProps} from './categories';

const ErrorPage: NextPage = () => (
  <Seo title="Error page" showHeaderFooter={false} metaDescription="Error page">
    <Error />
  </Seo>
);

export {getStaticProps};

export default ErrorPage;
