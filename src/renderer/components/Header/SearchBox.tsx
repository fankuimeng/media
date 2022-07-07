import React from 'react';
import { Popover, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchBox() {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <Popover placement="bottomLeft" content={content} title="Title">
      <Input
        className="header-search"
        placeholder="搜索音乐、视频、歌词、电台..."
        allowClear
        suffix={<SearchOutlined />}
      />
    </Popover>
  );
}
