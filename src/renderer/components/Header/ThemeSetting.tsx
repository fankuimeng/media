import { Popover } from 'antd';
import { SkinOutlined, CheckCircleOutlined } from '@ant-design/icons';
import CustomIcon from '../CustomIcon/CustomIcon';
import React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '../../mobx';
import { setThemeColor } from '../../utils';

interface colorObjectProps {
  key: string;
  color: string;
}
export const colorList = [
  {
    key: '中国红',
    color: '#c62f2f',
  },
  {
    key: '火山',
    color: '#FA541C',
  },
  {
    key: '日暮',
    color: '#FAAD14',
  },
  {
    key: '酷黑',
    color: '#111',
  },
  {
    key: '明青',
    color: '#13C2C2',
  },
  {
    key: '极光绿',
    color: '#52C41A',
  },
  {
    key: '拂晓蓝',
    color: '#1890FF',
  },
  {
    key: '极客蓝',
    color: '#2F54EB',
  },
  {
    key: '酱紫',
    color: '#722ED1',
  },
];

const ThemeSetting = observer(function () {
  const {
    mainStore: { getThemeColor, setThemeColor: setThemeColorStore },
  } = useStore();
  const content = (
    <div className="colorBlock">
      {colorList.map((item: colorObjectProps) => (
        <li
          className="color-item"
          key={item.color}
          onClick={() => {
            setThemeColor({
              '--setting-color': item.color,
              '--theme-style': item.color,
            });
            setThemeColorStore(item.color);
          }}
          style={{ backgroundColor: item.color }}
        >
          <CustomIcon
            className="custom-icon"
            type="wangyiyunyinle1"
          ></CustomIcon>
          <div className="name">{item.key}</div>
          <CheckCircleOutlined
            className="icon"
            style={{
              backgroundColor: item.color,
              display: getThemeColor === item.color ? 'block' : 'none',
            }}
          />
        </li>
      ))}
    </div>
  );
  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      content={content}
      overlayStyle={{ width: '240px', top: '50px' }}
    >
      <SkinOutlined style={{ fontSize: '16px' }} />
    </Popover>
  );
});

export default ThemeSetting;
