import {SVGIconProp} from '~/types/common';

type Size = 'large' | 'medium' | 'small';
type ButtonType = 'submit' | 'reset' | 'button';
type Variant = 'primary' | 'secondary' | 'ghost';

export interface IButtonProps {
  size?: Size;
  name?: string;
  title?: string;
  type?: ButtonType;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  LeftIcon?: SVGIconProp;
  RightIcon?: SVGIconProp;
  containerLeftClasses?: string;
  containerRightClasses?: string;
}
