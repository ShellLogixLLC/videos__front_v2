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
