import {ICommonRequestReturn, MutateData, VideosData} from '~/types';

export interface IVideosReturn extends ICommonRequestReturn {
  data: VideosData;
  mutate: MutateData;
}
