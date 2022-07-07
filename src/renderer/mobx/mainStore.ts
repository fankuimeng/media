import { makeAutoObservable } from 'mobx';
// import { request } from '../../utils/request';
import { RootStore } from './index';
import { LyricStateType, MusicInfoType, PlaySettingType } from './type';
class MainStore {
  rootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  state = {
    themeColor: '#c62f2f',
  };
  playList: MusicInfoType[] = [
    {
      musicName: '如果早点了解',
      MusicPath: 'http://127.0.0.1:5500/124.mp3',
    },
    // {
    //   musicName: '五十年以后',
    //   MusicPath: 'http://127.0.0.1:5500/mfk.mp3',
    // },
    // {
    //   musicName: '进阶',
    //   MusicPath: 'http://127.0.0.1:5500/mfk.flac',
    // },
  ];

  lyricState: LyricStateType = {
    lines: [],
    curLine: 0,
    lyric: '',
  };

  currentMusic: MusicInfoType = this.playList.length
    ? this.playList[0]
    : {
        musicName: '',
        MusicPath: '',
      };

  playSetting: PlaySettingType = {
    isShowPlayBar: true,
    playMode: 'liebiaoxunhuan',
    volume: 0.5,
    isShowLyric: false,
    isMuted: false,
  };

  setPlaySetting(playSetting: PlaySettingType) {
    this.playSetting = { ...playSetting };
  }

  get getPlaySetting() {
    return this.playSetting;
  }
  setThemeColor(data: string) {
    this.state.themeColor = data;
  }
  get getThemeColor() {
    return this.state.themeColor;
  }

  get getVolume() {
    return this.playSetting.volume;
  }
  setVolume(volume: number) {
    this.playSetting.volume = volume;
  }
  setCurrentMusic(music: MusicInfoType) {
    this.currentMusic = music;
  }
  get getCurrentMusic() {
    return this.currentMusic;
  }

  get getPlayList() {
    return this.playList;
  }
  setPlayList(playList: MusicInfoType[]) {
    return (this.playList = playList);
  }

  get getIsMuted() {
    return this.playSetting.isMuted;
  }
  setIsMuted(isMuted: boolean) {
    this.playSetting.isMuted = isMuted;
  }
  get getLyricState() {
    return this.lyricState;
  }
  setLyricState(lyricState: LyricStateType) {
    this.lyricState = { ...lyricState };
  }
  get getCurLine() {
    return this.lyricState.curLine;
  }
  setCurLine(curLine: number) {
    this.lyricState.curLine = curLine;
  }
}
export default MainStore;
