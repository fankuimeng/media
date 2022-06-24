import React from 'react';
import { lazy, ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../../layout/index';
// import Setting from '../pages/setting/index';
// import Home from '../pages/Home/index';
// 用懒加载实现优化
const Setting = lazy(() => import('../pages/setting/index'));
const Home = lazy(() => import('../pages/Home/index'));

// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        index: true,
        element: lazyLoad(<Home />),
      },
      {
        path: '/setting',
        element: lazyLoad(<Setting />),
      },
    ],
  },
];
