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

import './layout.css';
import useStore from '../mobx';

const Layout: React.FC = observer(function (props) {
  const {
    mainStore: { getThemeColor },
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
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        title={''}
        logo={null}
        headerContentRender={() => {
          return <Header></Header>;
        }}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: '网易云音乐',
        }}
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
              console.log(item, dom);

              setPathname(item.path || '/home');
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
        ></PageContainer>
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
    </div>
  );
});
export default Layout;
