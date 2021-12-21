import React from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {ILinkProps} from './types';
import styles from './Link.module.scss';

const Link: React.FC<ILinkProps> = ({
  to,
  blank,
  onClick,
  children,
  disabled,
  className,
  queryValue,
  anchorProps,
  queryKey = '',
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
    : asPath.includes(to);

  const anchorClasses = classNames(className, {
    [styles.container_disabled]: disabled,
    [styles.container_active]: activeClasses,
    [previousClasses]: previousClasses,
    [activeClassName]: activeClasses && activeClassName,
  });

  return (
    <NextLink href={to} {...linkProps}>
      <a
        role="button"
        className={anchorClasses}
        {...anchorModifiedProps}
        onClick={onClick}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
