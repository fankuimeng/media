import { observer } from 'mobx-react-lite';
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react';
import { useStore } from '../../mobx';
import { Lines } from '../../utils/type';
import './lyric.less';
import { Carousel } from 'antd';

interface propsType {
  className?: string;
  lineHeight?: number;
  showTime?: Boolean;
}

const LyricList = observer(
  forwardRef(function (props: propsType, ref) {
    const lyricList = useRef(null);
    const lyricLine = useRef(null);

    const {
      mainStore: {
        getLyricState: { lines = [], lyric },
        getCurLine,
      },
    } = useStore();
    useImperativeHandle(
      ref,
      () => ({
        scrollTo,
        lyricList,
        lyricLine,
      }),
      []
    );

    const scrollTo = (top: number, behavior: string | null = null) => {
      const lyricDom = lyricList.current;
      if (lyricDom && lyricDom.scrollTo) {
        lyricDom.scrollTo({
          top,
          behavior,
        });
      }
    };

    return (
      <React.Fragment>
        {lyric ? (
          <div
            className={
              props.className ? `lyric-list ${props.className}` : 'lyric-list'
            }
          >
            <div ref={lyricList} className="lyric-wrapper">
              {lines.map((item: Lines, index: number) => {
                return (
                  <p
                    className={getCurLine === index ? 'text current' : 'text'}
                    key={item.lineTime}
                    ref={getCurLine === index ? lyricLine : null}
                  >
                    <span>{item.txt}</span>
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  })
);

export default LyricList;
