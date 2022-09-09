import React from 'react';

import {CommentType} from '~/api/videos/types';
export interface ICommentBlock {
  comments: CommentType[];
  boolInverse: boolean;
  setLimit: (arg: number) => void;
  limit: number;
  totalCount: number;
}

export interface ICommentForm {
  addNewComment: (newComment: CommentType) => void;
  setEmojiOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IComment {
  comment: CommentType;
}
