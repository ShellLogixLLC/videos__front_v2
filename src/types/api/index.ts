export type MutateData = () => void;

export interface ICommonRequestReturn {
  isError: boolean;
  isLoading: boolean;
}

export type ApiServiceParamsTypes = {
  limit?: number;
  offset?: number;
  categoryIds?: string[];
};

export type AuthorizationConfigType = {
  Authorization: string;
};

export type ApiServiceOptionsTypes = {
  headers: AuthorizationConfigType;
};

export type Name = {
  [key: string]: string;
};

export type MonthAndWeekDay = {
  [key: string]: string[];
};

export type VideosData = {
  videos: VideosProps[];
  totalCount: number;
};

export type CategoriesData = {
  categories: CategoriesProps[];
  totalCount: number;
};

export type CategoriesProps = {
  id: string;
  name: Name;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
};

export type VideosProps = {
  id: string;
  tags: string[];
  title: Name;
  views: number;
  userId: string;
  duration: number;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  categoryIds: string[];
  description: Name;
  thumbnailPath: string;
  commentsCount: number;
};

export type SwrPageProps = {
  fallback: {[p: string]: unknown} | undefined;
};
