// import { ipcRenderer as _ipcRenderer } from 'electron';
// import { getCurrentWindow as _getCurrentWindow } from '@electron/remote';
// const { getCurrentWindow } = require('@electron/remote');

interface styleObjectProps {
  [key: string]: string;
}

export const setThemeColor = (styleObject: styleObjectProps) => {
  const docStyle = document.documentElement.style;
  for (const key in styleObject) {
    docStyle.setProperty(key, styleObject[key]);
  }
};

export function debounce(
  func: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  wait: number
) {
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
