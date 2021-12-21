import React from 'react';
import Head from 'next/head';

import {Header, Footer, PageContent} from '~/components';

import {ISeoProps} from './types';

const Seo: React.FC<ISeoProps> = ({
  title,
  children,
  className,
  metaDescription,
  showHeader = true,
  showFooter = true,
  showPageContent = true,
}) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Head>
    {showHeader && <Header />}
    {showPageContent && (
      <PageContent className={className}>{children}</PageContent>
    )}
    {showFooter && <Footer />}
  </React.Fragment>
);

export default Seo;
