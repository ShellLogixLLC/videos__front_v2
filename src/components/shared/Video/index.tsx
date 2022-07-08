import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import classNames from 'classnames';

import PlayIcon from '~/assets/icons/play-video.svg';
import PauseIcon from '~/assets/icons/pause.svg';
import VolumeIcon from '~/assets/icons/volume.svg';
import NextVideoIcon from '~/assets/icons/next-video.svg';
import FullScreenIcon from '~/assets/icons/full-screen.svg';
import {VideoSkeleton} from '~/components';
import MutedVolumeIcon from '~/assets/icons/muted-volume.svg';
import {useWindowSize, useEventListener} from '~/hooks/index';
import {
  SKIP_SECONDS,
  AHEAD_SECONDS,
  SPACE_KEY_CODE,
  ARROW_LEFT_KEY_CODE,
  ARROW_RIGHT_KEY_CODE,
} from '~/constants';

import VideoSlider from './VideoSlider';
import VolumeSlider from './VolumeSlider';
import {IVideoProps} from './types';
import styles from './Video.module.scss';

const Video: React.FC<IVideoProps> = ({
  videoSrc,
  posterSrc,
  videoClass = '',
  videoDuration,
  loading = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {isMaxTablet} = useWindowSize();

  const [muted, setMuted] = useState<boolean>(false);
  const [keyStatus, setKeyStatus] = useState({
    backward: false,
    forward: false,
  });
  const [wasPlaying, setWasPlaying] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [cachedVolume, setCachedVolume] = useState<number>(1);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );

  const handleSpace = (event: any) => {
    if (event.keyCode === SPACE_KEY_CODE) {
      if (wasPlaying) {
        videoRef.current?.pause();
        setWasPlaying(false);
      } else {
        videoRef.current?.play();
        setWasPlaying(true);
      }
    }
  };

  useEventListener('keydown', (event) => handleSpace(event));

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const handleSecAhead = (event: any) => {
    if (
      videoDuration - AHEAD_SECONDS >= currentTime &&
      currentTime + AHEAD_SECONDS < videoDuration - 1 &&
      event.keyCode === ARROW_RIGHT_KEY_CODE
    ) {
      if (videoElement) {
        const isPaused = videoElement.paused;
        videoElement.pause();
        videoElement.currentTime = currentTime + AHEAD_SECONDS;
        setCurrentTime(currentTime + AHEAD_SECONDS);
        if (!isPaused) {
          videoElement.play();
        }
      }
      setKeyStatus({backward: true, forward: false});
    }

    if (currentTime > AHEAD_SECONDS && event.keyCode === ARROW_LEFT_KEY_CODE) {
      if (videoElement) {
        const isPaused = videoElement.paused;
        videoElement.pause();
        videoElement.currentTime = currentTime - AHEAD_SECONDS;
        setCurrentTime(currentTime - AHEAD_SECONDS);
        if (!isPaused) {
          videoElement.play();
        }
      }
      setKeyStatus({backward: false, forward: true});
    }
  };

  useEventListener('keyup', (event) => handleSecAhead(event));

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

  useEffect(() => {
    const offAnimation = setTimeout(() => {
      setKeyStatus({backward: false, forward: false});
    }, 500);
    if (keyStatus.backward || keyStatus.forward) {
      offAnimation;
    }

    return () => {
      clearTimeout(offAnimation);
    };
  }, [keyStatus.backward, keyStatus.forward]);

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
      const nextTime =
        videoDuration > SKIP_SECONDS &&
        currentTime + SKIP_SECONDS < videoDuration
          ? currentTime + SKIP_SECONDS
          : videoDuration;
      const isPaused = videoElement.paused;
      videoElement.pause();
      videoElement.currentTime = nextTime;
      setCurrentTime(nextTime);
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

  const videoClasses = classNames(styles.video, videoClass, {
    [styles.video__backward]: keyStatus.backward,
    [styles.video__forward]: keyStatus.forward,
  });

  return (
    <React.Fragment>
      {loading ? (
        <VideoSkeleton />
      ) : (
        <div className={videoClasses}>
          {isMaxTablet && (
            <>
              <div
                className={styles.video__controls}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseOut}>
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
                    onChange={(e, newValue) =>
                      handleVolumeChange(Number(newValue))
                    }
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
                className={styles.video__progress}
                style={{width: `${videoProgressPercentage}%`}}
              />
            </>
          )}
          <video
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            ref={videoRef}
            muted={muted}
            poster={posterSrc}
            onClick={handleVideoClick}
            controls={!isMaxTablet}>
            <source src={videoSrc} type="video/mp4" />
            <track kind="captions" />
          </video>
          {videoElement?.paused && !isMouseOver && (
            <button onClick={handlePlayPauseClick}>
              <PlayIcon />
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Video;
