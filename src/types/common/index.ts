import React from 'react';

export type SVGIconProp = React.FC<React.SVGProps<SVGSVGElement>>;

export type CategoryTitleTypes = {
  categoryId?: string | string[];
  isNotActive?: boolean;
};

export type CategoryContentTypes = {
  activePage: number;
  totalCount: number;
  setTotalCount: (value: number) => void;
  rowsPerPage: number;
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

export type Params = {
  limit: number;
  offset: number;
  activeVCategoryId?: string | string[];
  startDate?: string;
  endDate?: string;
  likesSort?: number | string;
  viewsSort?: number | string;
  durationSort?: number | string;
};

export type SetParams = {
  params: Params;
  setParams: React.Dispatch<React.SetStateAction<Params>>;
};

export enum LocaleType {
  En = 'en',
  Ru = 'ru',
}

export enum WishlistActions {
  ADD = 'add',
  DELETE = 'delete',
}
