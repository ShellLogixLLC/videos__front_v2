export type SVGIconProp = React.FC<React.SVGProps<SVGSVGElement>>;

export type CategoryTitleTypes = {
  categoryId?: string | string[];
};

export type CategoryContentTypes = {
  activePage: number;
  categoryId?: string | string[];
  setTotalCount: (value: number) => void;
};

export type QueryParamsTypes = {
  page?: number;
  name?: string;
};

export enum LocaleType {
  En = 'en',
  Ru = 'ru',
}
