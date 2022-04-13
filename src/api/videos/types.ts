import {ICommonRequestReturn, MutateData, VideosDataProps} from '~/types';

export interface IVideosReturn extends ICommonRequestReturn {
  videosData: VideosDataProps;
  mutateVideo: MutateData;
}
