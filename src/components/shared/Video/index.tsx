import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import classNames from 'classnames';

import {useWindowSize} from '~/hooks/index';
import PlayIcon from '~/assets/icons/play-video.svg';
import PauseIcon from '~/assets/icons/pause.svg';
import VolumeIcon from '~/assets/icons/volume.svg';
import NextVideoIcon from '~/assets/icons/next-video.svg';
import FullScreenIcon from '~/assets/icons/full-screen.svg';
import MutedVolumeIcon from '~/assets/icons/muted-volume.svg';

import VideoSlider from './VideoSlider';
import VolumeSlider from './VolumeSlider';
import styles from './Video.module.scss';

interface Props {
  videoSrc: string;
  videoDuration: number;
}

const Video: React.FC<Props> = ({videoDuration, videoSrc}) => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const [cachedVolume, setCachedVolume] = useState<number>(1);
  const [wasPlaying, setWasPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const {isMaxTablet} = useWindowSize();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleTimeUpdate = (event: any) => {
      setCurrentTime(event.target?.currentTime);
    };

    setVideoElement(video);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const handlePlayPauseClick = () => {
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  const handleVideoClick = () => {
    if (isMaxTablet) {
      handlePlayPauseClick();
    }
  };

  const handleChange = (newValue: number) => {
    if (videoElement && !videoElement.paused) {
      setWasPlaying(true);
      videoElement.pause();
    }
    setCurrentTime(newValue);
  };

  const handleChangeCommitted = (newValue: number) => {
    setCurrentTime(newValue);
    if (videoElement) {
      videoElement.currentTime = newValue;
      if (wasPlaying) {
        videoElement.play();
        setWasPlaying(false);
      }
    }
  };

  const handleSkipSeconds = () => {
    if (videoElement) {
      const isPaused = videoElement.paused;
      videoElement.pause();
      videoElement.currentTime = currentTime + 15;
      setCurrentTime(currentTime + 15);
      if (!isPaused) {
        videoElement.play();
      }
    }
  };

  const handleVolumeChange = (newValue: number) => {
    if (videoElement) {
      if (muted) {
        setMuted(false);
      }
      videoElement.volume = newValue / 100;
      setCachedVolume(videoElement.volume);
    }
  };

  const handleFullScreen = () => {
    if (videoElement) {
      videoElement.requestFullscreen();
    }
  };

  const handleMuteChange = () => {
    setMuted(!muted);

    if (videoElement) {
      if (muted) {
        videoElement.volume = cachedVolume;
      } else {
        setCachedVolume(videoElement.volume);
        videoElement.volume = 0;
      }
    }
  };

  const currentSeconds = currentTime ? Math.floor(currentTime) : 1000;

  const currentTimeString = currentTime
    ? moment(currentSeconds * 1000).format('mm:ss')
    : '00:00';

  const volumeSliderValue = videoElement
    ? Math.round(videoElement.volume * 100)
    : 0;

  const videoProgressPercentage = Math.min(
    (currentTime / videoDuration) * 100,
    100,
  );

  return (
    <div className={styles.video}>
      {isMaxTablet && (
        <>
          <div className={styles.video__controls}>
            <div
              role="button"
              onClick={handlePlayPauseClick}
              className={classNames(
                styles.video__controls__button,
                styles.video__controls__play_pause,
              )}>
              {!videoElement?.paused ? <PauseIcon /> : <PlayIcon />}
            </div>
            <div
              role="button"
              onClick={handleSkipSeconds}
              className={classNames(
                styles.video__controls__button,
                styles.video__controls__skip,
              )}>
              <NextVideoIcon />
            </div>
            <div
              role="button"
              onClick={handleMuteChange}
              className={classNames(
                styles.video__controls__button,
                styles.video__controls__volume_button,
              )}>
              {muted ? <MutedVolumeIcon /> : <VolumeIcon />}
            </div>
            <div className={styles.video__controls__volume_range}>
              <VolumeSlider
                min={0}
                max={100}
                value={volumeSliderValue}
                onChange={(e, newValue) => handleVolumeChange(Number(newValue))}
              />
            </div>
            <div className={styles.video__controls__duration}>
              <p>{currentTimeString}</p>
            </div>
            <div className={styles.video__controls__range}>
              <VideoSlider
                value={currentTime}
                min={0}
                max={videoDuration}
                onChange={(e, newValue) => handleChange(Number(newValue))}
                onChangeCommitted={(e, newValue) =>
                  handleChangeCommitted(Number(newValue))
                }
              />
            </div>
            <div className={styles.video__controls__duration}>
              <p>{moment(videoDuration * 1000).format('mm:ss')}</p>
            </div>
            <div
              role="button"
              onClick={handleFullScreen}
              className={styles.video__controls__button}>
              <FullScreenIcon />
            </div>
          </div>
          <div
            style={{width: `${videoProgressPercentage}%`}}
            className={styles.video__progress}
          />
        </>
      )}
      <video
        ref={videoRef}
        muted={muted}
        onClick={handleVideoClick}
        controls={!isMaxTablet}>
        <source src={videoSrc} type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  );
};

export default Video;
