import {VideosProps, CategoriesProps} from '~/types';

export type FilmCardProps = {
  item: CategoriesProps | VideosProps;
  cardClasses?: string;
  isLoading?: boolean;
};
