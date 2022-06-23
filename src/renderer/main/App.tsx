import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';

import { UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import { ProLayout, SettingDrawer } from '@ant-design/pro-layout';

import defaultProps from '../_defaultProps';

import './App.css';

const App: React.FC = function () {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [pathname, setPathname] = useState('/welcome');
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
        logo={logo}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: 'Pro Layout',
        }}
        menuFooterRender={(props: { collapsed: any }) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            ></a>
          );
        }}
        onMenuHeaderClick={(e: any) => console.log(e)}
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
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      ></ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={changeSetting => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      />
    </div>
  );
};

// const c: React.FC = function () {
//   return (
//     <div className="top-bar">
//       <div className="top-bar-logo">
//         <img src={logo} alt="LOGO" />
//       </div>
//       <div className="top-bar-main">
//         <div className="top-bar-control">{/* <controls /> */}</div>
//         <div className="top-bar-search">{/* <search-box /> */}</div>
//         <div className="top-bar-menu">
//           <div className="top-bar-menu-user">
//             <div className="item">{/* <user-info /> */}</div>
//             <div className="item">{/* <theme-setting /> */}</div>
//             <div
//               className="item"
//               // @click="$router.push({ path: '/setting' })"
//             >
//               {/* <a-icon type="setting" className="icon" /> */}
//             </div>
//             <div className="item" v-if="userId">
//               退出
//             </div>
//           </div>
//           {/* <frame-actions /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

export default App;
