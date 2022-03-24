import React from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {LinkProps} from './types';

const Link: React.FC<LinkProps> = ({
  to,
  blank,
  target,
  onClick,
  children,
  disabled,
  className,
  queryValue,
  anchorProps,
  queryKey = '',
  disabledClasses = '',
  previousClasses = '',
  activeClassName = '',
  ...linkProps
}) => {
  const {asPath, query} = useRouter();

  const anchorModifiedProps = blank
    ? {
        ...anchorProps,
        target: '_blank',
        rel: 'noreferrer',
      }
    : anchorProps;
  const activeClasses = query[queryKey]
    ? query[queryKey] === queryValue
    : asPath === to;

  const anchorClasses = classNames(className, {
    [disabledClasses]: disabled,
    [previousClasses]: previousClasses,
    [activeClassName]: activeClasses && activeClassName,
  });

  return (
    <NextLink href={to} {...linkProps}>
      <a
        target={target}
        onClick={onClick}
        {...anchorModifiedProps}
        className={anchorClasses}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
