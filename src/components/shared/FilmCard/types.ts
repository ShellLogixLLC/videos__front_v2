import {VideosProps, CategoriesProps, WishlistActions} from '~/types';

export type FilmCardProps = {
  item: CategoriesProps | VideosProps;
  wishlist?: string[];
  isFavorite?: boolean;
  isWishlistPage?: boolean;
  cardClasses?: string;
  refreshVideos?: (
    type: WishlistActions,
    item: VideosProps | CategoriesProps,
  ) => void;
};
