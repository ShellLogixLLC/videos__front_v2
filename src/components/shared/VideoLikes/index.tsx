import React, {useState} from 'react';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';

import {LikedIcon} from '~/assets';
import {videoActions} from '~/store/video';
import {getCookieFromBrowser, setCookie} from '~/libraries';

import {VideoLikesProps} from './type';
import styles from './VideoLikes.module.scss';

const VideoLikes: React.FC<VideoLikesProps> = ({likesCount, id}) => {
  const dispatch = useDispatch();

  const videoLikesIds = getCookieFromBrowser('videoLikesIds') as string;
  const currentList = videoLikesIds ? JSON.parse(videoLikesIds) : [];
  const isLiked = currentList.includes(id);

  const [dislike, setDislike] = useState(!isLiked);
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);

  const iconClass = classNames({[styles.dislike]: !dislike});

  const handleChangeLiked = async () => {
    setDislike(!dislike);
    await dispatch(
      videoActions.likedVideo({
        videoId: id,
        dislike: !dislike,
      }),
    );
    if (dislike) {
      setLocalLikeCount(1);
      setCookie('videoLikesIds', JSON.stringify([...currentList, id]));
    } else {
      const localCount = isLiked ? -1 : 0;
      setLocalLikeCount(localCount);
      const filteretedArr = currentList.filter((el: string) => el !== id);
      setCookie('videoLikesIds', JSON.stringify(filteretedArr));
    }
  };

  return (
    <>
      <LikedIcon className={iconClass} onClick={handleChangeLiked} />
      <p>{likesCount + localLikeCount}</p>
    </>
  );
};

export default VideoLikes;
