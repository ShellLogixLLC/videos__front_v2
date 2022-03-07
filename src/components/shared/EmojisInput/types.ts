import {MouseEvent} from 'react';

import {SVGIconProp} from '~/types/common/index';

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
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
  | 'week'
  | 'datetime-local';

export type InputProps = {
  value?: string | number;
  name?: string;
  label?: string;
  error?: string;
  type?: InputType;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onClick?: () => void;
  rightIconStyle?: string;
  innerClassName?: string;
  labelClassName?: string;
  RightIcon?: SVGIconProp;
  RightToggledIcon?: SVGIconProp;
  onMouseOver?: (e: MouseEvent<HTMLInputElement>) => void;
};
