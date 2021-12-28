import {SVGIconProp} from '~/types/common/index';

export type FilterType = {
  id: number;
  routes?: string;
  nameRoute: string;
};

export type FilterProps = {
  IconProp: SVGIconProp;
  filterTitle: string;
  //
  options: FilterType[];
};
