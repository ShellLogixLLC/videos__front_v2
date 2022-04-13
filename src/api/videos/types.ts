import {ICommonRequestReturn, MutateData, VideosProps} from '~/types';

export interface IVideosReturn extends ICommonRequestReturn {
  videosData: {videos: VideosProps[]; totalCount: number};
  mutateVideo: MutateData;
}
