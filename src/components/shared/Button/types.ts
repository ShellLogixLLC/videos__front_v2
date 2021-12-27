type Size = 'large' | 'medium' | 'small';
type Variant = 'primary' | 'secondary' | 'ghost';
type ButtonType = 'submit' | 'reset' | 'button';

export interface IButtonProps {
  size?: Size;
  type?: ButtonType;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  containerLeftClasses?: string;
  LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
