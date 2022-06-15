import {ICommonRequestReturn, MutateData, VideosData} from '~/types';

export interface IWishlist extends ICommonRequestReturn {
  data: VideosData;
  mutate: MutateData;
}
