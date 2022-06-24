import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import { Avatar } from 'antd';
function UserInfo() {
  return (
    <div>
      <span className="header-user">
        <Avatar size={30} className="avatar" icon={<UserOutlined />} />
        <span style={{ color: '#fff' }}>未登录</span>
      </span>
    </div>
  );
}

export default UserInfo;
