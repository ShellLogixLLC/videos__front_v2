import {VideosProps, CategoriesProps} from '~/types';

export type FilmCardProps = {
  item: CategoriesProps | VideosProps;
  wishlist?: string[];
  isFavorite?: boolean;
  cardClasses?: string;
};
