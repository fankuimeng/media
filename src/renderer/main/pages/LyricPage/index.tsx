import React, { useCallback, useEffect, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import MusicView from '../../../components/common/MusicView';
import LyricList from '../../../components/Lyric';
import './index.less';
import { useStore } from '../../../mobx';
import { observer } from 'mobx-react-lite';

const LINE_HEIGHT = 42;

const LyricPage = observer(function () {
  const viewer = useRef(null);
  const lyrics = useRef(null);
  const {
    mainStore: {
      setPlaySetting,
      getPlaySetting,
      getCurLine,
      getLyricState: { lines },
    },
  } = useStore();

  useEffect(() => {
    handleLineChange();
  }, [getCurLine]);

  const handleLineChange = useCallback(() => {
    const curLinesDom = lyrics.current?.lyricLine.current;
    if (curLinesDom) {
      let top =
        curLinesDom?.offsetTop > 0
          ? Number(curLinesDom.offsetTop - LINE_HEIGHT * 5)
          : 0;

      lyrics.current.scrollTo(top, 'smooth');
    }
  }, []);
  return (
    <div className="music-view">
      <div
        className="bg-player"
        // :style="'backgroundImage: url(' + current_song.avatar + ')'"
        // v-if="current_song.avatar"
      ></div>
      <DownOutlined
        onClick={() =>
          setPlaySetting({
            ...getPlaySetting,
            isShowLyric: !getPlaySetting.isShowLyric,
          })
        }
        className="icon"
      ></DownOutlined>
      <div className="lyric">
        <LyricList className="view" ref={lyrics} />
      </div>
    </div>
  );
});

export default LyricPage;
