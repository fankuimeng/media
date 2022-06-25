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

const { ipcRenderer } = require('electron');
const { getCurrentWindow } = require('@electron/remote');

// import { getCurrentWindow } from '@electron/remote';

const Header: React.FC = function () {
  const history = useNavigate();
  const [isMax, setIsMax] = useState(() => {
    return getCurrentWindow().isMaximized();
  });
  function setFrame(action: string) {
    switch (action) {
      case 'min':
        ipcRenderer.send('window-min');
        break;
      case 'plus':
        ipcRenderer.send('window-max', isMax);
        setIsMax(getCurrentWindow().isMaximized());
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
      <div className="top-bar-logo" onClick={() => history('/')}>
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
          <div className="frame-actions">
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
