import React from 'react';

import {SVGIconProp} from '~/types/common/index';

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type InputProps = {
  value?: string | number;
  name: string;
  label?: string;
  error?: string;
  type?: InputType;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  rightIconStyle?: string;
  innerClassName?: string;
  labelClassName?: string;
  onChange?: (event: React.ChangeEvent) => void;
  RightIcon?: SVGIconProp;
  RightToggledIcon?: SVGIconProp;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
};
