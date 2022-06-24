import React from 'react';
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
  SkinOutlined,
} from '@ant-design/icons';
import UserInfo from './UserInfo';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = function () {
  const history = useNavigate();

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
              <SkinOutlined style={{ fontSize: '16px' }} />
            </div>
            <div className="item" onClick={() => history('/setting')}>
              <SettingOutlined className="icon" />
            </div>
          </div>
          <div className="frame-actions">
            <MinusOutlined className="window-action"></MinusOutlined>
            {true ? (
              <BorderOutlined className="window-action"></BorderOutlined>
            ) : (
              <ShrinkOutlined className="window-action"></ShrinkOutlined>
            )}
            <CloseOutlined className="window-action"></CloseOutlined>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
