export type RoutesProps = {
  id: number;
  pageName: string;
  routeName: string;
  queryValue?: string;
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

export type ErrorToast = {
  email?: string;
  username?: string;
  password?: string;
  passwordConfirmation?: string;
};
