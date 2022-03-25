export type RoutesProps = {
  routeName: string;
  pageName: string;
  id: number;
};

export type FilteredProp = {
  nameRoute: string;
  id: number;
};

export type Comment = {
  id: number;
  name: string;
  comment: string;
};

export type ILangData = {
  Icon: React.FC;
  locale: string;
};
