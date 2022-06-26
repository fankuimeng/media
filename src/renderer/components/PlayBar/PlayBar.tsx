import React, { useCallback, useRef } from 'react';
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
import MFK from '../../assets/music/mfk.mp3';
import { useImmer } from 'use-immer';

function PlayBar() {
  const audio = useRef(null);

  const [{ percent, bufferedPercent, waiting }, setPosition] = useImmer(() => ({
    percent: 0,
    bufferedPercent: 0,
    waiting: false,
  }));

  const [{ isPlay }, setMusic] = useImmer(() => ({
    isPlay: false,
  }));

  const percentChanged = (percent: number) => {
    setPosition(draft => {
      draft.percent = percent;
    });
  };
  const virtualBarMove = (pageX: number, percent: number) => {
    console.log(pageX, percent);
  };

  const onVirtualBarLeave = () => {
    console.log('onVirtualBarLeave');
  };

  const onPlaying = useCallback(() => {
    this.waiting = false;
    if (this.lyricInstance) {
      const currentTime = this.$refs.audio.currentTime;
      this.lyricInstance.seek(currentTime * 1000);
    }
  }, []);

  const handlePlay = useCallback(() => {
    const currentAudio = audio.current;
    if (currentAudio) {
      if (!isPlay) currentAudio.play();
      else currentAudio.pause();
    }
    setMusic(draft => {
      draft.isPlay = !isPlay;
    });
  }, [isPlay]);

  return (
    <div className="player">
      <div className="bar1">
        <StepBackwardOutlined className="step-icon" />
        {!isPlay ? (
          <PlayCircleFilled onClick={handlePlay} className="play-icon" />
        ) : (
          <PauseCircleFilled onClick={handlePlay} className="play-icon" />
        )}
        <StepForwardOutlined className="step-icon" />
      </div>
      <div className="bar2">
        <time className="time">03:22</time>
        <ProgressBar
          percent={percent}
          bufferedPercent={bufferedPercent}
          waiting={waiting}
          percentChanged={percentChanged}
          // @percentChanging="onPercentChanged"
          virtualBarMove={virtualBarMove}
          virtualBarLeave={onVirtualBarLeave}
        />
        <audio
          crossOrigin="anonymous"
          id="audio"
          src={MFK}
          ref={audio}
          //   play={onPlay}
          //   pause={onPause}
          //   ended={onEnd}
          //   timeupdate={updateTime}
          //   waiting={onWaiting}
          //   playing={onPlaying}
          //   error={onError}
        />
        <time className="time">03:22</time>
      </div>
      <div className="bar3">
        <CustomIcon
          type={false ? 'muted' : 'no-muted'}
          className="custom-icon"
        ></CustomIcon>
        <ProgressBar
          percent={0.5}
          size="small"
          // @percentChanged="onVolumeChanged"
          className="bar-volume"
        />
      </div>
      <div className="bar4">
        <CustomIcon type="tubiao" className="custom-icon"></CustomIcon>
        <Tooltip title="单曲循环">
          <span>
            <CustomIcon
              type={
                'danquxunhuan1'
                //   true
                //     ? '顺序播放'
                //     : // : this.mode === playMode.loop
                //       // ? "循环播放"
                //       // : this.mode === playMode.random
                //       // ? "随机播放"
                //       '心动模式'
              }
              className="custom-icon"
            ></CustomIcon>
          </span>
        </Tooltip>
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
}

export default PlayBar;
