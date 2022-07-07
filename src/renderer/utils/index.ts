// import { ipcRenderer as _ipcRenderer } from 'electron';
// import { getCurrentWindow as _getCurrentWindow } from '@electron/remote';
// const { getCurrentWindow } = require('@electron/remote');

import { Lines } from './type';

interface styleObjectProps {
  [key: string]: string;
}

export const setThemeColor = (styleObject: styleObjectProps) => {
  const docStyle = document.documentElement.style;
  for (const key in styleObject) {
    docStyle.setProperty(key, styleObject[key]);
  }
};

export function debounce(func: any, wait = 500) {
  let timer: string | number | NodeJS.Timeout = null;
  return function () {
    let args = arguments;
    let context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

export let isWeb = () => {
  try {
    global;
  } catch (error) {
    console.log('不支持api');
    return true;
  }
};

export const ipcRenderer = async (
  callback: (result: Electron.IpcRenderer) => void
) => {
  let ipcRenderer;
  try {
    ipcRenderer = require('electron').ipcRenderer;
  } catch (error) {
    console.log('不支持api');
  }
  callback(ipcRenderer);
};

export const getCurrentWindow = async (
  callback: (result: Electron.CrossProcessExports.BrowserWindow) => void
) => {
  let getCurrentWindow;
  try {
    getCurrentWindow = require('@electron/remote').getCurrentWindow;
  } catch (error) {
    console.log('不支持api');
    // getCurrentWindow = (await import('@electron/remote')).getCurrentWindow;
  }
  callback(getCurrentWindow);
};

/*
 * 转换为分秒
 */

export function formatSeconds(value: number) {
  if (!value) return '00:00';
  let m =
    Math.floor((value / 60) % 60) < 10
      ? '0' + Math.floor((value / 60) % 60)
      : Math.floor((value / 60) % 60);
  let s =
    Math.floor(value % 60) < 10
      ? '0' + Math.floor(value % 60)
      : Math.floor(value % 60);
  return `${m}:${s}`;
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min); // min,max之间的随机数（包含min,max）
};

const lyricTimeReg: RegExp = /\[(\d{2}):(\d{2}).(\d{2,3})]/g;

export const handleLyric = (lrcs: string): Lines[] => {
  const lines: Lines[] = [];
  lrcs.split('\n').forEach(lrc => {
    let time = lyricTimeReg.exec(lrc);

    // 后面传time就不用非空断言了
    if (!time) {
      return;
    }
    let txt: string = lrc.replace(lyricTimeReg, '');

    // 过滤空白文本
    if (txt === '') {
      return;
    }

    lines.push({
      lineTime: transformRegTime(time),
      txt,
    });
  });

  // 升序，确保歌词是由它的时间来决定当前的位置
  lines.sort((a, b) => {
    return a.lineTime - b.lineTime;
  });
  return lines;
};

function transformRegTime(times: RegExpExecArray): number {
  const result: number[] = [];
  times.forEach((time, index) => {
    if (index >= 1 && index <= 3) {
      result.push(parseInt(time));
    }
  });
  return (result[0] * 60 + result[1]) * 1000 + result[2];
}

export const getHandleCurLine = (
  currentTime: number,
  lines: Lines[]
): number => {
  if (!currentTime || !lines[0]?.lineTime || currentTime < lines[0]?.lineTime)
    return 0;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (!lines[index + 1]) return index;
    if (currentTime >= line.lineTime && currentTime < lines[index + 1].lineTime)
      return index;
  }
};
