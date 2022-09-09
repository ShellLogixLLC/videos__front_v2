import React, {MouseEvent} from 'react';
import {BaseEmoji} from 'emoji-mart';

import {SVGIconProp} from '~/types';

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
  addEmoji: (e: BaseEmoji) => void;
  RightToggledIcon?: SVGIconProp;
  onMouseOver?: (e: MouseEvent<HTMLInputElement>) => void;
  setEmojiOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
