import {VideosProps, CategoriesProps} from '~/types';

export type FilmCardProps = {
  item: CategoriesProps | VideosProps;
  cardClasses?: string;
  wishlist?: string[];
  isFavorite?: boolean;
};
