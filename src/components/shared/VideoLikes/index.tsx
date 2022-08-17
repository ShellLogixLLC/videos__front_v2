import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';

import {LikedIcon} from '~/assets';
import {VideosService} from '~/api';
import {videoActions} from '~/store/video';
import {getCookieFromBrowser, setCookie} from '~/libraries';

import {VideoLikesProps} from './type';
import styles from './VideoLikes.module.scss';

const VideoLikes: React.FC<VideoLikesProps> = ({id, likesCount}) => {
  const dispatch = useDispatch();
  const token = getCookieFromBrowser('token');

  const {data, mutate} = VideosService.useVideoLiked(id);

  const dataIsLiked = data?.isLiked;
  const dataLikeCount = data?.likesCount;

  const videoLikesIds = getCookieFromBrowser('videoLikesIds') as string;
  const currentList = videoLikesIds ? JSON.parse(videoLikesIds) : [];

  const isCookiesLiked = currentList.includes(id);
  const currentLiked = token ? dataIsLiked : isCookiesLiked;

  const [isLiked, setIsLiked] = useState<boolean>(currentLiked);
  const [likedCount, setLikedCount] = useState<number>(likesCount || 0);

  useEffect(() => {
    setIsLiked(currentLiked);
    setLikedCount(dataLikeCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLikeCount, currentLiked]);

  const iconClass = classNames(styles.icon, {
    [styles.icon__dislike]: isLiked,
  });

  const handleChangeLiked = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setCookie('videoLikesIds', JSON.stringify([...currentList, id]));
      if (token) {
        await dispatch(videoActions.likeVideo({videoId: id, dislike: false}));
      }
    } else {
      const filteretedArr = currentList.filter((el: string) => el !== id);
      setCookie('videoLikesIds', JSON.stringify(filteretedArr));
      if (token) {
        await dispatch(videoActions.dislikeVideo({videoId: id}));
      }
    }
    await mutate();
  };

  return (
    <>
      <LikedIcon className={iconClass} onClick={handleChangeLiked} />
      <p>{likedCount}</p>
    </>
  );
};

export default VideoLikes;
