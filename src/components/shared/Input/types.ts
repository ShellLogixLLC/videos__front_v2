import {KeyboardEvent, MouseEvent} from 'react';

import {SVGIconProp} from '~/types/common';

export type InputType =
  | 'url'
  | 'tel'
  | 'date'
  | 'week'
  | 'text'
  | 'time'
  | 'file'
  | 'color'
  | 'image'
  | 'email'
  | 'month'
  | 'radio'
  | 'range'
  | 'reset'
  | 'button'
  | 'hidden'
  | 'number'
  | 'search'
  | 'submit'
  | 'checkbox'
  | 'password'
  | 'verification'
  | 'datetime-local';

export type InputProps = {
  name?: string;
  label?: string;
  error?: string;
  autoFocus?: any;
  type?: InputType;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
  labelText?: string;
  onFocus?: () => void;
  onClick?: () => void;
  value?: string | number;
  wrapperRef?: React.ForwardedRef<HTMLDivElement>;
  rightIconStyle?: string;
  innerClassName?: string;
  labelClassName?: string;
  RightIcon?: SVGIconProp;
  inpValue?: string | number;
  RightToggledIcon?: SVGIconProp;
  toggleHandle?: (e?: React.FormEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onMouseOver?: (e: MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
