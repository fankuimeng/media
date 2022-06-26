import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import Controls from './Controls';
import './Header.less';
import SearchBox from './SearchBox';
import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  ShrinkOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import UserInfo from './UserInfo';
import { useNavigate } from 'react-router-dom';
import ThemeSetting from './ThemeSetting';
import {
  getCurrentWindow as _getCurrentWindow,
  ipcRenderer as _ipcRenderer,
  isWeb,
} from '../../utils';

const Header: React.FC = function () {
  const history = useNavigate();
  const [isMax, setIsMax] = useState(() => {
    let getCurrentWindow: null | Electron.CrossProcessExports.BrowserWindow =
      null;
    _getCurrentWindow(result => {
      getCurrentWindow = result;
    });
    // 使用web模式
    return getCurrentWindow ? getCurrentWindow.isMaximized : true;
  });
  function setFrame(action: string) {
    let ipcRenderer: null | Electron.IpcRenderer = null;
    _ipcRenderer(result => {
      ipcRenderer = result;
    });
    switch (action) {
      case 'min':
        ipcRenderer.send('window-min');
        break;
      case 'plus':
        ipcRenderer.send('window-max', isMax);
        setIsMax(!isMax);
        break;
      case 'close':
        ipcRenderer.send('window-closed');
        break;
      case 'mini':
        ipcRenderer.send('toggle-mini', {
          value: true,
        });
        break;
    }
  }

  return (
    <div className="top-bar">
      <div
        className="top-bar-logo"
        onClick={() => {
          console.log('222');
          history('/');
        }}
      >
        <img src={logo} alt="LOGO" />
      </div>
      <div className="top-bar-main">
        <div className="top-bar-control">
          <Controls />
        </div>
        <div className="top-bar-search search-wrapper">
          <SearchBox />
        </div>
        <div className="top-bar-menu">
          <div className="top-bar-menu-user">
            <div className="item">
              <UserInfo></UserInfo>
            </div>
            <div className="item">
              <ThemeSetting />
            </div>
            <div className="item" onClick={() => history('/setting')}>
              <SettingOutlined className="icon" />
            </div>
          </div>
          <div
            className="frame-actions"
            style={{ display: `${isWeb() ? 'none' : 'block'}` }}
          >
            <MinusOutlined
              onClick={() => setFrame('min')}
              className="window-action"
            ></MinusOutlined>
            {!isMax ? (
              <BorderOutlined
                onClick={() => setFrame('plus')}
                className="window-action"
              ></BorderOutlined>
            ) : (
              <ShrinkOutlined
                onClick={() => setFrame('plus')}
                className="window-action"
              ></ShrinkOutlined>
            )}
            <CloseOutlined
              className="window-action"
              onClick={() => setFrame('close')}
            ></CloseOutlined>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
