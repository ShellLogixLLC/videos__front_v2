import React from 'react';
import classNames from 'classnames';

import {PageContentProps} from './type';

const PageContent: React.FC<PageContentProps> = ({
  children,
  className,
  showHeaderFooter,
}) => {
  const pageContentClasses = classNames('container project_body', className, {
    ['project_body_height']: !showHeaderFooter,
  });

  return <main className={pageContentClasses}>{children}</main>;
};

export default PageContent;
