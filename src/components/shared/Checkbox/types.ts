import {ChangeEvent, FormEvent} from 'react';

export interface ICheckboxProps {
  name: string;
  value?: boolean;
  className?: string;
  useCustomOnChange?: boolean;
  onChange?: (event: FormEvent<HTMLInputElement> | boolean) => void;
  customOnChange?: (event: ChangeEvent) => void;
}
