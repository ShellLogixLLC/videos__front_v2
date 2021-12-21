import React from 'react';
import classNames from 'classnames';

import {PageContentClasses} from './type';

const PageContent: React.FC<PageContentClasses> = ({children, className}) => {
  const pageContentClasses = classNames('container project_body', className);

  return <div className={pageContentClasses}>{children}</div>;
};

export default PageContent;
