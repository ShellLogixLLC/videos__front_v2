import {ChangeEvent} from 'react';

export interface ICheckboxProps {
  name: string;
  value?: boolean;
  children?: any;
  className?: string;
  useCustomOnChange?: boolean;
  onChange?: (event: any) => void;
  customOnChange?: (event: ChangeEvent) => void;
}
