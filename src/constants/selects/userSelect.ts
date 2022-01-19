// import {IOption} from '~/components/dropdowns/Select/types';
export type IOption = {
  id: number;
  name: string;
  shownName: string;
};

export interface ISelectProps {
  error?: string;
  name?: string;
  label?: string;
  className?: string;
  options: IOption[];
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: IOption;
}

const userSelect: IOption[] = [
  {
    id: 0,
    name: 'viewer',
    shownName: 'Viewer',
  },
  {
    id: 1,
    name: 'editor',
    shownName: 'Editor',
  },
];

export default userSelect;
