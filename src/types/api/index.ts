export type MutateData = () => void;

export interface ICommonRequestReturn {
  isError: boolean;
  isLoading: boolean;
}

export type NameProps = {
  en: string;
  ru: string;
};

export type VideosDataProps = {
  videos: VideosProps[];
  totalCount: number;
};

export type CategoriesDataProps = {
  categories: CategoriesProps[];
  totalCount: number;
};

export type CategoriesProps = {
  id: string;
  name: NameProps;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
};

export type VideosProps = {
  id: string;
  tags: string[];
  title: NameProps;
  userId: string;
  duration: number;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  categoryIds: string[];
  description: NameProps;
  thumbnailPath: string;
};
