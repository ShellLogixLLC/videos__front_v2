import {CategoriesDataProps, ICommonRequestReturn, MutateData} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  data: CategoriesDataProps;
  mutateCategories: MutateData;
}
