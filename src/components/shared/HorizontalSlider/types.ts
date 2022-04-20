import {CategoriesProps, VideosProps} from '~/types';

export type HorizontalSliderProps = {
  dataList: VideosProps[] | CategoriesProps[];
  className?: string;
  isCategory?: boolean;
  dataIsLoading?: boolean;
};
