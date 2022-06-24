import { CrownOutlined, TabletOutlined } from '@ant-design/icons';
import React from 'react';

export default {
  route: {
    path: '/',
    routes: [
      {
        name: '列表页',
        icon: <TabletOutlined />,
        path: '/list',
        component: './ListTableList',
        routes: [
          {
            path: '/list/sub-page',
            name: '一级列表页面',
            icon: <CrownOutlined />,
            routes: [
              {
                path: '/home',
                name: '一一级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
            ],
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
