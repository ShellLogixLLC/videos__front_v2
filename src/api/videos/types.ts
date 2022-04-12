import {ICommonRequestReturn, MutateData, VideosProps} from '~/types';

export interface IVideosReturn extends ICommonRequestReturn {
  videosData: {videos: VideosProps; totalCount: number} | unknown | any;
  mutateVideo: MutateData;
}
