export type IFilterType = {
  id: number;
  routes?: string;
  nameRoute: string;
};

export type IFilterProps = {
  options: IFilterType[];
};
