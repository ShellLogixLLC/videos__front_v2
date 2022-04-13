import {ICommonRequestReturn, MutateData, VideosData} from '~/types';

export interface IVideosReturn extends ICommonRequestReturn {
  videosData: VideosData;
  mutateVideo: MutateData;
}
