import {CategoriesData, ICommonRequestReturn, MutateData} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  data: CategoriesData;
  mutateCategories: MutateData;
}
