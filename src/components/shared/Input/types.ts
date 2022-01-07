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
  name?: string;
  label?: string;
  error?: string;
  type?: InputType;
  className?: string;
  inpValue?: string | number;
  disabled?: boolean;
  onChange?: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  rightIconStyle?: string;
  innerClassName?: string;
  labelClassName?: string;
  RightIcon?: SVGIconProp;
  RightComponent?: any;
  RightToggledIcon?: SVGIconProp;
  onFocus?: () => void;
  onClick?: () => void;
  onMouseOver?: any;
};
