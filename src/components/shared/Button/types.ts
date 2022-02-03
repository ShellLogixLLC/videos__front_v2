import {SVGIconProp} from '~/types/common/index';

type Size = 'large' | 'medium' | 'small';
type Variant = 'primary' | 'secondary' | 'ghost';
type ButtonType = 'submit' | 'reset' | 'button';

export interface IButtonProps {
  size?: Size;
  name?: string;
  title?: string;
  type?: ButtonType;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  containerLeftClasses?: string;
  LeftIcon?: SVGIconProp;
}
