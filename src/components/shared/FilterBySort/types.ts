export type IFilterType = {
  id: number;
  routes?: string;
  nameCategory: string;
};

export type IFilterBySortProps = {
  options: IFilterType[];
};
