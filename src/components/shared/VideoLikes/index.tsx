import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';

import {LikedIcon} from '~/assets';
import {VideosService} from '~/api';
import {videoActions} from '~/store/video';
import {getCookieFromBrowser} from '~/libraries';
import {UnRegisterPopup} from '~/components';

import {VideoLikesProps} from './types';
import styles from './VideoLikes.module.scss';

const VideoLikes: React.FC<VideoLikesProps> = ({id, likesCount}) => {
  const dispatch = useDispatch();
  const token = getCookieFromBrowser('token');

  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

  const {data, mutate} = VideosService.useVideoLiked();

  const isVideoLiked = data?.includes(id) || false;

  // const videoLikesIds = getCookieFromBrowser('videoLikesIds') as string;
  // const currentList = videoLikesIds ? JSON.parse(videoLikesIds) : [];

  // const isCookiesLiked = currentList.includes(id);

  //I HAVE COMMENTED THESE LINES BECAUSE IT COULD BE USED IN THE FUTURE--MKO

  const [isLiked, setIsLiked] = useState<boolean>(isVideoLiked);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  useEffect(() => {
    setIsLiked(isVideoLiked);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoLiked]);

  const iconClass = classNames(styles.icon, {
    [styles.icon__dislike]: isLiked,
  });

  const handleChangeLiked = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      await dispatch(videoActions.likeVideo({videoId: id, dislike: false}));
      // setCookie('videoLikesIds', JSON.stringify([...currentList, id]));
    } else {
      // const filteretedArr = currentList.filter((el: string) => el !== id);
      await dispatch(videoActions.dislikeVideo({videoId: id}));
      // setCookie('videoLikesIds', JSON.stringify(filteretedArr));
    }
    // await dispatch(videoActions.getLikedVideoIds());
    await mutate();
  };

  const handleIconClick = () => {
    token ? handleChangeLiked() : handleOpenPopup();
  };

  return (
    <>
      <LikedIcon className={iconClass} onClick={handleIconClick} />
      <p>{likesCount}</p>
      <UnRegisterPopup
        title="youShouldBeSignInToBeAbleToLikeVideo"
        expanded={isPopupOpen}
        setExpanded={setPopupOpen}
      />
    </>
  );
};

export default VideoLikes;
