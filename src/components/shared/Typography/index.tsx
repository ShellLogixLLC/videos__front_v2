import React from 'react';
import classNames from 'classnames';

import {FontStyles} from '~/constants';

import {TypographyProps} from './types';

const Typography: React.FC<
  TypographyProps & React.HTMLAttributes<HTMLOrSVGElement>
> = ({
  children,
  tagName = 'p',
  className = '',
  align = 'left',
  type = 'Regular',
  variant = 'Text',
  ...rest
}) => {
  const alignKey = FontStyles[`Text${align}` as keyof typeof FontStyles];
  const fontKey = FontStyles[`${variant}${type}` as keyof typeof FontStyles];
  const classes = classNames(alignKey, fontKey, {
    [className]: className,
  });

  const Tag = tagName;

  return (
    <Tag {...rest} className={classes}>
      {children}
    </Tag>
  );
};

export default Typography;
