import {SVGIconProp} from '~/types/common/index';

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'verification'
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
  name?: string;
  label?: string;
  error?: string;
  readOnly?: boolean;
  maxLength?: number;
  autoFocus?: any;
  // onFocus?: any;
  onKeyUp?: any;
  type?: InputType;
  className?: string;
  onKeyDown?: any;
  inpValue?: string | number;
  disabled?: boolean;
  // onChange?: (
  //   e?:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLTextAreaElement>,
  // ) => void;
  onChange?: any;
  placeholder?: any;
  rightIconStyle?: string;
  innerClassName?: string;
  labelClassName?: string;
  labelText?: string;
  RightIcon?: SVGIconProp;
  RightComponent?: any;
  RightToggledIcon?: SVGIconProp;
  onFocus?: () => void;
  onClick?: () => void;
  onMouseOver?: any;
};
