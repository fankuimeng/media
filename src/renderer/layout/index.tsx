import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import {
  ProLayout,
  SettingDrawer,
  PageContainer,
} from '@ant-design/pro-layout';

import defaultProps from './_defaultProps';
import { observer } from 'mobx-react-lite';

import { useStore } from '../mobx';
import PlayBar from '../components/PlayBar/PlayBar';
import './layout.css';
import LyricPage from '../main/pages/LyricPage';

const Layout: React.FC = observer(function (props) {
  const {
    mainStore: { getThemeColor, setPlaySetting, getPlaySetting },
  } = useStore();

  const setting = {
    fixSiderbar: true,
    layout: 'mix',
    navTheme: 'light',
    primaryColor: getThemeColor,
  };
  const [pathname, setPathname] = useState('/home');
  return (
    <div
      id="pro-layout"
      style={{
        height: 'calc(100vh - 60px)',
      }}
    >
      <ProLayout
        {...defaultProps}
        title={''}
        logo={null}
        headerContentRender={() => {
          return <Header></Header>;
        }}
        disableMobile={true}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: '网易云音乐',
        }}
        collapsedButtonRender={null}
        menuItemRender={(
          item: { path: any },
          dom:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
        ) => (
          <a
            onClick={() => {
              setPathname(item.path || '/');
            }}
          >
            {dom}
          </a>
        )}
        {...setting}
      >
        <PageContainer
          header={{
            title: null,
            breadcrumb: {},
          }}
        >
          <Outlet />
        </PageContainer>
      </ProLayout>
      {/* <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        hideHintAlert
        getContainer={() => document.getElementById('test-pro-layout')}
        //   settings={settings}
        hideCopyButton
        //   onSettingChange={changeSetting => {
        //     if (changeSetting.navTheme === 'realDark') {
        //       setThemeColor({
        //         '--darkreader-bg--setting-color': changeSetting.primaryColor,
        //         '--darkreader-bg--theme-style': 'rgb(36, 37, 37)',
        //         '--theme-style': 'rgb(36, 37, 37)',
        //       });
        //     } else {
        //       setThemeColor({
        //         '--setting-color': changeSetting.primaryColor,
        //         '--theme-style': '#c62f2f',
        //       });
        //     }

        //     setSetting(changeSetting);
        //   }}
        //   disableUrlParams={false}
      /> */}
      <PlayBar></PlayBar>
      {getPlaySetting.isShowLyric ? <LyricPage></LyricPage> : null}
    </div>
  );
});
export default Layout;
