import {ICommonRequestReturn, MutateData, VideosProps} from '~/types';

export interface IWishlist extends ICommonRequestReturn {
  data: VideosProps[];
  mutate: MutateData;
}
