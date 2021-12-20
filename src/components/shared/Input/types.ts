import React from 'react';

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

export interface IInputProps {
  value?: any;
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
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightToggledIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
}
