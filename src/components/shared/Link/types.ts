export interface LinkProps {
  to: string;
  as?: string;
  blank?: boolean;
  target?: string;
  locale?: string;
  queryKey?: string;
  disabled?: boolean;
  className?: string;
  queryValue?: string;
  onClick?: () => void;
  disabledClasses?: string;
  previousClasses?: string;
  activeClassName?: string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
