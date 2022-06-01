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

export type Name = {
  en: string;
  ru: string;
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
  userId: string;
  duration: number;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  categoryIds: string[];
  description: Name;
  thumbnailPath: string;
};

export type WishlistProps = {
  id: string;
  title: Name;
  description: Name;
  userId: string;
  filePath: string;
  thumbnailPath: string;
  duration: number;
  likesCount: number;
  commentsCount: number;
  categoryIds: string[];
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type SwrPageProps = {
  fallback: {[p: string]: unknown} | undefined;
};
