import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/index.less'
import App from './renderer/main/App';

// 目前 react type 不支持createRoot;
ReactDOM.render(<App />, document.getElementById('root'));
