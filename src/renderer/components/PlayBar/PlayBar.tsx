import React, { useCallback, useEffect, useRef } from 'react';
import CustomIcon from '../CustomIcon/CustomIcon';
import { Popover, Tooltip, Radio } from 'antd';
import {
  StepBackwardOutlined,
  PlayCircleFilled,
  StepForwardOutlined,
  PauseCircleFilled,
} from '@ant-design/icons';
import ProgressBar from '../common/index';
import './index.less';
import { observer } from 'mobx-react-lite';
import { useImmer } from 'use-immer';
import { useStore } from '../../mobx';
import {
  debounce,
  formatSeconds,
  getHandleCurLine,
  getRandomInt,
  handleLyric,
} from '../../utils';
import { lyric, playMode } from '../../config';
import { MusicInfoType } from '../../mobx/type';
import { useDebounce } from 'ahooks';

const duration = '003:26';

const PlayBar = observer(function () {
  const audio = useRef(null);
  const {
    mainStore: {
      getCurrentMusic,
      setVolume,
      getVolume,
      getIsMuted,
      setIsMuted,
      setCurrentMusic,
      getPlayList,
      setPlaySetting,
      getPlaySetting,
      getLyricState,
      setLyricState,
      setCurLine,
    },
  } = useStore();

  const [
    { isPlay, percent, bufferedPercent, waiting, currentTime, buffered },
    setMusic,
  ] = useImmer(() => ({
    isPlay: false,
    buffered: 0,
    visible: false,
    percent: 0,
    currentTime: 0,
    waiting: false,
    bufferedPercent: '00:00',
  }));

  useEffect(() => {
    const currentAudio = audio.current;
    if (currentAudio) {
      setMusic(draft => {
        draft.percent = Number(currentTime) / currentAudio.duration;
      });
    }
  }, [currentTime]);

  const percentChanged = (percent: number) => {
    const currentAudio = audio.current;
    if (currentAudio) {
      setMusic(draft => {
        draft.currentTime = currentAudio.currentTime =
          currentAudio.duration * percent;
      });
      const curLine = getHandleCurLine(
        currentAudio.duration * percent * 1000,
        getLyricState.lines
      );
    }
  };

  const virtualBarMove = (pageX: number, percent: number) => {};

  const onVirtualBarLeave = () => {};

  const onPlayEnd = useCallback(() => {
    const currentAudio = audio.current;
    if (currentAudio) {
      setMusic(draft => {
        draft.currentTime = currentAudio.currentTime = 0;
      });

      nextMusic();
    }
  }, []);

  const nextMusic = useCallback(() => {
    let currentIndex;
    let playMusic: MusicInfoType;

    if (getPlaySetting.playMode === playMode[2].mode)
      playMusic = getPlayList[getRandomInt(0, getPlayList.length - 1)];
    else if (getPlaySetting.playMode === playMode[1].mode)
      playMusic = getCurrentMusic;
    else if (getPlaySetting.playMode === playMode[0].mode) {
      // 循环播放
      getPlayList.map((item, i) => {
        if (item.MusicPath === getCurrentMusic.MusicPath) currentIndex = i;
      });
      if (currentIndex === undefined || currentIndex === getPlayList.length - 1)
        playMusic = getPlayList[0];
      else playMusic = getPlayList[Number(currentIndex) + 1];
    } else console.log('心跳模式');

    play(playMusic);
  }, [getCurrentMusic, getPlaySetting.playMode]);

  const prevMusic = useCallback(() => {
    let currentIndex;
    let playMusic: MusicInfoType;
    getPlayList.map((item, i) => {
      if (item.MusicPath === getCurrentMusic.MusicPath) {
        currentIndex = i;
      }
    });
    if (currentIndex === undefined) {
      playMusic = getPlayList[0];
    } else if (currentIndex === 0) {
      playMusic = getPlayList[getPlayList.length - 1];
    }
    play(playMusic);
  }, [getCurrentMusic]);

  const handlePlay = useCallback(() => {
    const currentAudio = audio.current;
    if (currentAudio) {
      if (!currentAudio.src) {
        currentAudio.src = getCurrentMusic.MusicPath;
        lyricPlay();
      }
      if (isPlay) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setMusic(draft => {
        draft.isPlay = !isPlay;
      });
    }
  }, [isPlay]);

  const lyricPlay = () => {
    const lines = handleLyric(lyric);
    setLyricState({ lyric, lines, curLine: 0 });
  };

  const play = (playMusic: MusicInfoType) => {
    const currentAudio = audio.current;
    if (currentAudio) {
      currentAudio.src = playMusic.MusicPath;
      currentAudio.play();
      setCurrentMusic(playMusic);
      setMusic(draft => {
        draft.isPlay = true;
      });
      lyricPlay();
    }
  };

  const handleUpdateTime = useCallback(
    (e: any) => {
      const currentAudio = audio.current;
      const timeRanges = currentAudio.buffered;
      setMusic(draft => {
        draft.currentTime = e.target.currentTime;
        if (timeRanges.length != 0)
          draft.buffered = timeRanges.end(timeRanges.length - 1);
      });
      const curLine = getHandleCurLine(currentTime * 1000, getLyricState.lines);
      setCurLine(Number(curLine));
    },

    [currentTime]
  );

  const onVolumeChanged = useCallback(
    (percent: number) => {
      const currentAudio = audio.current;
      if (percent < 0) percent = 0;
      if (percent > 1) percent = 1;
      currentAudio.volume = percent;
      setVolume(percent);
    },
    [getVolume]
  );

  const handleMuted = useCallback(() => {
    const currentAudio = audio.current;
    if (currentAudio) {
      currentAudio.muted = !getIsMuted;
      setIsMuted(!getIsMuted);
    }
  }, [getIsMuted]);

  const handlePlayMode = useCallback(() => {
    let currentIndex = 0;
    playMode.map((item, i) => {
      if (item.mode === getPlaySetting.playMode) currentIndex = i;
    });
    if (currentIndex === playMode.length - 1) {
      currentIndex = 0;
    } else currentIndex = Number(currentIndex) + 1;
    setPlaySetting({
      ...getPlaySetting,
      playMode: playMode[currentIndex].mode,
    });
  }, [getPlaySetting.playMode]);

  return (
    <div className="player">
      <div className="bar1">
        <StepBackwardOutlined onClick={prevMusic} className="step-icon" />
        {!isPlay ? (
          <PlayCircleFilled onClick={handlePlay} className="play-icon" />
        ) : (
          <PauseCircleFilled onClick={handlePlay} className="play-icon" />
        )}
        <StepForwardOutlined onClick={nextMusic} className="step-icon" />
      </div>
      <div className="bar2">
        <time className="time">{formatSeconds(currentTime)}</time>
        <ProgressBar
          percent={percent}
          bufferedPercent={bufferedPercent}
          waiting={waiting}
          percentChanged={percentChanged}
          //   percentChanging={onPercentChanged}
          virtualBarMove={virtualBarMove}
          virtualBarLeave={onVirtualBarLeave}
        />
        <audio
          crossOrigin="anonymous"
          id="audio"
          ref={audio}
          //   play={onPlay}
          //   pause={onPause}
          onEnded={onPlayEnd}
          onTimeUpdate={handleUpdateTime}
          //   waiting={onWaiting}
          //   playing={onPlaying}
          //   error={onError}
        />
        <time className="time">{getCurrentMusic.duration || duration}</time>
      </div>
      <div className="bar3">
        <CustomIcon
          type={getIsMuted ? 'muted' : 'no-muted'}
          className="custom-icon"
          onClick={handleMuted}
        ></CustomIcon>
        <ProgressBar
          percent={getVolume}
          size="small"
          percentChanged={onVolumeChanged}
          className="bar-volume"
        />
      </div>
      <div className="bar4">
        <CustomIcon
          onClick={() => {
            setPlaySetting({
              ...getPlaySetting,
              isShowLyric: !getPlaySetting.isShowLyric,
            });
          }}
          type="tubiao"
          className="custom-icon"
        ></CustomIcon>
        {
          <Tooltip
            title={
              playMode.find(item => item.mode === getPlaySetting.playMode)
                ?.label
            }
          >
            <span>
              <CustomIcon
                onClick={handlePlayMode}
                type={
                  playMode.find(item => item.mode === getPlaySetting.playMode)
                    ?.mode
                }
                className="custom-icon"
              ></CustomIcon>
            </span>
          </Tooltip>
        }
        <CustomIcon
          type="geci"
          className="lrc"
          // :class="{ active: isShowDesktoplyric }"
          // @click.native="toggleCurrentLyric"
        />
        <Popover
          trigger="click"
          placement="top"
          overlayClassName="play-history"
          content={
            <div
              className=""
              // @close="closeDrawer"
            >
              <div className="play-history-title">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="current-play-table">
                    播放列表
                  </Radio.Button>
                  <Radio.Button value="history-play-table">
                    历史记录
                  </Radio.Button>
                </Radio.Group>
              </div>
              {/* <component :is="playComponent"></component> */}
            </div>
          }
        >
          <span className="count-wrapper">
            <CustomIcon type="yinleliebiaokuai" />
            <span className="count">{22}</span>
          </span>
        </Popover>
      </div>
      <span className="resize"></span>
    </div>
  );
});

export default PlayBar;
