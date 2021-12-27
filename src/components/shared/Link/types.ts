export interface ILinkProps {
  to: string;
  blank?: boolean;
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
