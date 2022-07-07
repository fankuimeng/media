import { Lines } from '../utils/type';

export interface MusicInfoType {
  [key: string]: string;
}

export interface PlaySettingType {
  isShowPlayBar: boolean;
  playMode: string;
  volume: number;
  isShowLyric: boolean;
  isMuted: boolean;
}

export interface LyricStateType {
  lines: Lines[];
  lyric: string;
  curLine: number;
}
