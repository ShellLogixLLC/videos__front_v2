import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';
import {isEqual} from 'lodash';

import {LikedIcon} from '~/assets';
import {videoActions} from '~/store/video';
import {getCookieFromBrowser, setCookie} from '~/libraries';
import {VideosService} from '~/api';

import {VideoLikesProps} from './type';
import styles from './VideoLikes.module.scss';

const VideoLikes: React.FC<VideoLikesProps> = ({id}) => {
  const dispatch = useDispatch();
  const token = getCookieFromBrowser('token');

  const {data, mutate} = VideosService.useVideoLiked(id);

  const dataIsLiked = data?.isLiked;
  const dataLikeCount = data?.likesCount;

  const videoLikesIds = getCookieFromBrowser('videoLikesIds') as string;
  const currentList = videoLikesIds ? JSON.parse(videoLikesIds) : [];

  const isCookiesLiked = currentList.includes(id);
  const currentLiked = token ? dataIsLiked : isCookiesLiked;

  const [islike, setIslike] = useState(currentLiked);
  const [likeCount, setLikeCount] = useState<number>(dataLikeCount || 0);

  useEffect(() => {
    if (!isEqual(dataLikeCount, likeCount)) {
      setLikeCount(dataLikeCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLikeCount]);

  const iconClass = classNames(styles.icon, {
    [styles.icon__dislike]: currentLiked,
  });

  const handleChangeLiked = async () => {
    await dispatch(
      videoActions.likedVideo({
        videoId: id,
        dislike: !islike,
      }),
    );
    if (!islike) {
      setCookie('videoLikesIds', JSON.stringify([...currentList, id]));
    } else {
      const filteretedArr = currentList.filter((el: string) => el !== id);
      setCookie('videoLikesIds', JSON.stringify(filteretedArr));
    }
    setIslike(!islike);
    mutate();
  };

  return (
    <>
      <LikedIcon className={iconClass} onClick={handleChangeLiked} />
      <p>{likeCount}</p>
    </>
  );
};

export default VideoLikes;
