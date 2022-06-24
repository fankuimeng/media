import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import type { ProSettings } from '@ant-design/pro-components';
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
import { setThemeColor } from '../utils';

const Layout: React.FC = observer(function () {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    primaryColor: '#FAAD14',
    navTheme: 'light',
  });
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
        // rightContentRender={() => (
        //   <div>
        //     <Avatar shape="square" size="small" icon={<UserOutlined />} />
        //   </div>
        // )}
        {...settings}
      >
        <PageContainer
          header={{
            title: null,
            breadcrumb: {},
          }}
        >
          <Outlet></Outlet>
        </PageContainer>
      </ProLayout>
      <React.Fragment>
        <SettingDrawer
          pathname={pathname}
          enableDarkTheme
          hideHintAlert
          getContainer={() => document.getElementById('test-pro-layout')}
          settings={settings}
          hideCopyButton
          onSettingChange={changeSetting => {
            if (changeSetting.navTheme === 'realDark') {
              setThemeColor({
                '--darkreader-bg--setting-color': changeSetting.primaryColor,
                '--darkreader-bg--theme-style': 'rgb(36, 37, 37)',
                '--theme-style': 'rgb(36, 37, 37)',
              });
            } else {
              setThemeColor({
                '--setting-color': changeSetting.primaryColor,
                '--theme-style': '#c62f2f',
              });
            }

            setSetting(changeSetting);
          }}
          disableUrlParams={false}
        />
      </React.Fragment>
    </div>
  );
});
export default Layout;
