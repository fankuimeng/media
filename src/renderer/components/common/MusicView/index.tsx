import React, { forwardRef } from 'react';
import './index.less';

const MusicView = React.forwardRef(function (props, ref) {
  return (
    <div>
      <canvas id="canvas" v-show="!showGlow"></canvas>
      {/* <canvas id="wrap" height="640" width="640" ></canvas> */}
      <div
        className="avatar-wrapper"
        v-show="showGlow"
        style={{ display: 'none' }}
        // @click="avatarClick"
        // v-if="Object.keys(current_song).length"
      >
        <img
          src="https://tse2-mm.cn.bing.net/th/id/OIP-C.Zxtf2X2EddV-g7hKyBhilAHaQB?pid=ImgDet&rs=1"
          className="avatar paused"
        />
      </div>
    </div>
  );
});

export default MusicView;
