import {UserInfo} from '~/store/auth/types';
import {
  MutateData,
  VideosData,
  VideosProps,
  ICommonRequestReturn,
} from '~/types';

export type CommentType = {
  id: string;
  user?: UserInfo | null;
  videoId?: string | string[];
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

export type VideoLikedProps = {
  isLiked: boolean;
  isDisliked: boolean;
  likesCount: number;
  dislikesCount: number;
};

export interface IComments {
  comments: CommentType[];
  totalCount: number;
}

export interface IVideosReturn extends ICommonRequestReturn {
  videosData: VideosData;
  mutateVideo: MutateData;
}

export interface IVideoById extends ICommonRequestReturn {
  data: VideosProps;
  mutate: MutateData;
}

export interface IVideoLiked extends ICommonRequestReturn {
  data: VideoLikedProps;
  mutate: MutateData;
}

export interface IVideoSimilar extends ICommonRequestReturn {
  data: VideosProps[];
  mutate: MutateData;
}

export interface IVideoComments extends ICommonRequestReturn {
  data: IComments;
  mutate: MutateData;
}
