import {CategoriesProps, ICommonRequestReturn, MutateData} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  categories: {categories: CategoriesProps[]; totalCount: number} | unknown;
  mutateUsers: MutateData;
}
