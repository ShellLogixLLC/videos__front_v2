import React from 'react';
import Head from 'next/head';

import {ToggleContextProvider} from '~/context';
import {Header, Footer, PageContent} from '~/components';

import {ISeoProps} from './types';

const Seo: React.FC<ISeoProps> = ({
  title,
  children,
  className,
  metaDescription,
  showHeaderFooter = true,
  showPageContent = true,
}) => (
  <React.Fragment>
    <Head>
      <meta name="description" content={metaDescription} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="FRONT" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      <title>{title}</title>
    </Head>
    <ToggleContextProvider>
      {showHeaderFooter && <Header />}
    </ToggleContextProvider>
    {showPageContent && (
      <PageContent showHeaderFooter={showHeaderFooter} className={className}>
        {children}
      </PageContent>
    )}
    {showHeaderFooter && <Footer />}
  </React.Fragment>
);

export default Seo;
