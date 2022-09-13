import {KeyboardEvent, MouseEvent} from 'react';
import {UseFormSetValue} from 'react-hook-form';

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
  type?: InputType;
  label?: string;
  smallLabel?: string;
  setValue: UseFormSetValue<any>;
  error?: string;
  value?: string | number;
  onFocus?: () => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  inpValue?: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  maxLength?: number;
  labelText?: string;
  className?: string;
  RightIcon?: SVGIconProp;
  autoFocus?: any;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  wrapperRef?: React.ForwardedRef<HTMLDivElement>;
  warningText?: string;
  onMouseOver?: (e: MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
  toggleHandle?: (e: React.FormEvent) => void;
  rightIconStyle?: string;
  innerClassName?: string;
  labelClassName?: string;
  RightToggledIcon?: SVGIconProp;
};
