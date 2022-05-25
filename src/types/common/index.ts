export type SVGIconProp = React.FC<React.SVGProps<SVGSVGElement>>;

export type CategoryTitleTypes = {
  categoryId?: string | string[] | undefined;
};

export type CategoryContentTypes = {
  activePage: number;
  categoryId?: string | string[] | undefined;
  setTotalCount: (value: number) => void;
};

export type queryParamsTypes = {
  page?: number;
  name?: string;
};
