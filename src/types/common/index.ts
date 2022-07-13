export type SVGIconProp = React.FC<React.SVGProps<SVGSVGElement>>;

export type CategoryTitleTypes = {
  categoryId?: string | string[];
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
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
};

export enum LocaleType {
  En = 'en',
  Ru = 'ru',
}
