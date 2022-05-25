import {
  MutateData,
  VideosData,
  CategoriesData,
  CategoriesProps,
  ICommonRequestReturn,
} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  data: CategoriesData;
  mutateCategories: MutateData;
}

export interface ICategory extends ICommonRequestReturn {
  data: CategoriesProps;
  mutate: MutateData;
}

export interface IVideoByCategory extends ICommonRequestReturn {
  data: VideosData;
  mutate: MutateData;
}
