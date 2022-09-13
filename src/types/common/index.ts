import React from 'react';
import {number} from 'yup';

export type SVGIconProp = React.FC<React.SVGProps<SVGSVGElement>>;

export type CategoryTitleTypes = {
  categoryId?: string | string[];
  isNotActive?: boolean;
  setSubCategoryLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryContentTypes = {
  activePage: number;
  totalCount: number;
  rowsPerPage: number;
  setTotalCount: (value: number) => void;
  subCategoryLoading: boolean;
};

export type QueryParamsTypes = {
  page?: number;
  name?: string;
  likesSort?: number | string;
  viewsSort?: number | string;
  durationSort?: number | string;
  activeCategory?: string;
};

export type ActiveCategoryParams = {
  limit: number;
  offset: number;
  startDate?: string;
  endDate?: string;
  likesSort?: number | string;
  viewsSort?: number | string;
};

export type SortingParamsType = {
  limit: number;
  offset: number;
  activeVCategoryId?: string | string[];
  startDate?: string;
  endDate?: string;
  likesSort?: number | string;
  viewsSort?: number | string;
  durationSort?: number | string;
};

export type RandomSortingParamsType = {
  limit: number;
  startDate?: number;
  endDate?: number;
};

export type SetRandomSortingParamsType = {
  params: RandomSortingParamsType;
  setParams: React.Dispatch<React.SetStateAction<RandomSortingParamsType>>;
};

export type SetSortingParamsType = {
  params: SortingParamsType;
  setParams: React.Dispatch<React.SetStateAction<SortingParamsType>>;
};

export enum LocaleType {
  En = 'en',
  Ru = 'ru',
}

export enum WishlistActions {
  ADD = 'add',
  DELETE = 'delete',
}
