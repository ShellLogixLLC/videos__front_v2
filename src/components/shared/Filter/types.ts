export type FilterType = {
  id: number;
  routes?: string;
  nameRoute: any;
};

export type FilterProps = {
  iconProp: any;
  filterTitle: string;
  //
  options: FilterType[];
};
