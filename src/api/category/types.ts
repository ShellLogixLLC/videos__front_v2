import {CategoriesProps, ICommonRequestReturn, MutateData} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  data: {categories: CategoriesProps[]; totalCount: number};
  mutateCategories: MutateData;
}
