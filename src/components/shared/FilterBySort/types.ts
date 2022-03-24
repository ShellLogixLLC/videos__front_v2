export type IFilterType = {
  id: number;
  routes?: string;
  nameRoute: string;
};

export type IFilterBySortProps = {
  options: IFilterType[];
};
