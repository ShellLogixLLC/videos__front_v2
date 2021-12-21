export type FilterType = {
  id: number;
  routes?: string;
  nameRoute: any;
};

export type FilterProps = {
  IconProp: any;
  filterTitle: string;
  //
  options: FilterType[];
};
