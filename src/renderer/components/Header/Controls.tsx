import React from 'react';
import { LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons';

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
function Controls() {
  const navigate = useNavigate();
  return (
    <Button.Group className="button-action" size="small">
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={() => navigate(-1)}
      ></Button>
      <Button
        type="primary"
        onClick={() => navigate(1)}
        icon={<RightOutlined />}
      ></Button>
      <Button type="primary" icon={<RedoOutlined />}></Button>
    </Button.Group>
  );
}

export default Controls;
