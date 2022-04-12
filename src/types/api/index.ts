export type MutateData = () => void;

export interface ICommonRequestReturn {
  isError: boolean;
  isLoading: boolean;
}

export type CategoriesProps = {
  id: string;
  name: {
    en: string;
    ru: string;
  };
  imagePath: string;
  createdAt: string;
  updatedAt: string;
};

export type VideosProps = {
  categoryIds: string[];
  createdAt: string;
  description: {en: string; ru: string};
  duration: number;
  filePath: string;
  id: string;
  likesCount: number;
  tags: string[];
  thumbnailPath: string;
  title: {en: string; ru: string};
  updatedAt: string;
  userId: string;
};
