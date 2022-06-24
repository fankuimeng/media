import { useRoutes } from 'react-router-dom';
import { routers } from './router/index';
import 'antd/dist/antd.variable.min.css';
import { observer } from 'mobx-react-lite';
import useStore from '../mobx';

const App = observer(function () {
  const {
    mainStore: { getThemeColor },
  } = useStore();

  return useRoutes(routers);
});

export default App;
