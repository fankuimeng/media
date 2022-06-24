import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';

const iconURL = 'https://at.alicdn.com/t/font_1188071_1m1k6mct6ob.js';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    iconURL, // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});

interface CustomIconProps {
  type: string;
  className?: string;
  required?: Boolean;
}
function CustomIcon({ type, className }: CustomIconProps) {
  return <IconFont className={className} type={`icon-${type}`} />;
}

export default CustomIcon;
