import React from 'react';

export type SVGIconProp = React.FC<React.SVGProps<SVGSVGElement>>;

export type CategoryTitleTypes = {
  categoryId?: string | string[];
};

export type CategoryContentTypes = {
  activePage: number;
  categoryId?: string | string[];
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

export enum LocaleType {
  En = 'en',
  Ru = 'ru',
}

export enum WishlistActions {
  ADD = 'add',
  DELETE = 'delete',
}
