import {CategoriesProps, ICommonRequestReturn, MutateData} from '~/types';

export interface ICategory extends ICommonRequestReturn {
  data: CategoriesProps;
  mutate: MutateData;
}
