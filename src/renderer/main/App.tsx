import { useRoutes } from 'react-router-dom';
import React from 'react';
import { routers } from './router/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../mobx';
import { ConfigProvider } from 'antd';
import './App.css';

const App = observer(function () {
  const {
    mainStore: { getThemeColor },
  } = useStore();
  ConfigProvider.config({
    theme: {
      primaryColor: getThemeColor,
    },
  });
  return useRoutes(routers);
});

export default App;
