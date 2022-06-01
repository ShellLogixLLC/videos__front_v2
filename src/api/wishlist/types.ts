import {ICommonRequestReturn, MutateData, WishlistProps} from '~/types';

export interface IWishlistReturn extends ICommonRequestReturn {
  videosData: WishlistProps[];
  mutateVideo: MutateData;
}
