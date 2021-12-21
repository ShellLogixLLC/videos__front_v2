import React from 'react';

export interface ILinkProps {
  to: string;
  blank?: boolean;
  queryKey?: string;
  disabled?: boolean;
  className?: string;
  queryValue?: string;
  onClick?: () => void;
  previousClasses?: string;
  activeClassName?: string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
