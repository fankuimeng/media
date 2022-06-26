import React, {
  HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useSize, useDebounce } from 'ahooks';
import './ProgressBar.less';
import loading from '../../assets/images/loading.gif';
import { useImmer } from 'use-immer';
import { debounce } from '../../utils';

interface progressBarPropsType {
  percent?: number;
  bufferedPercent?: number;
  size?: String;
  waiting?: Boolean;
  percentChanged?: (calcPercent: number) => void;
  virtualBarMove?: (pageX: number, percent: number) => void;
  virtualBarLeave?: () => void;
  className?: string | null;
}

const mouse = {
  startX: 0,
  isDown: true,
  left: 0,
  moveX: 0,
};

function ProgressBar({
  percent = 0,
  bufferedPercent = 0,
  size = 'default',
  waiting = false,
  percentChanged,
  virtualBarMove,
  virtualBarLeave,
  className,
}: progressBarPropsType) {
  const [position, setPosition] = useImmer(() => ({
    bufferedOffsetWidth: 0,
    progressOffsetWidth: 0,
    progressbarTranslateX: 0,
  }));

  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement | null>(null);
  const buffered = useRef<HTMLDivElement>(null);
  const virtualBar = useRef<HTMLDivElement>(null);

  const progressBarSize = useDebounce(useSize(progressBar), { wait: 50 });

  useEffect(() => {
    virtualBar.current?.addEventListener(
      'mousemove',
      debounce((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        const _progressBar = progressBar.current;
        let pageX = e.pageX;
        let diff = pageX - _progressBar?.getBoundingClientRect().left;
        let percent = (diff / _progressBar?.clientWidth).toFixed(2);
        virtualBarMove(pageX, Number(percent));
      }, 500)
    );
    virtualBar.current?.addEventListener(
      'mouseleave',
      debounce(() => {
        virtualBarLeave();
      }, 200)
    );
  }, []);

  useEffect(() => {
    handleResize(percent);
  }, [progressBarSize?.width]);

  useEffect(() => {
    if (percent >= 0 && !mouse.isDown) {
      changeProgressbarWidth(percent);
    }
  }, [percent]);
  useEffect(() => {
    if (percent >= 0) {
      changeBufferedWidth(percent);
    }
  }, [bufferedPercent]);
  const handleResize = useCallback((percent: number) => {
    changeBufferedWidth(percent);
    changeProgressbarWidth(percent);
  }, []);

  const progressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = progressBar.current?.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      setPosition(draft => {
        draft.progressbarTranslateX = offsetWidth;
        draft.progressOffsetWidth = offsetWidth;
      });
      percentChanged(Number(calcPercent(offsetWidth)));
    },
    []
  );

  const calcPercent = (offsetWidth: number) => {
    return Number(offsetWidth / progressBar.current?.clientWidth).toFixed(2);
  };

  const changeProgressbarWidth = useCallback(
    (percent: number) => {
      const barWidth = progressBar.current?.getBoundingClientRect().width;
      const offsetWidth = percent * barWidth;

      setPosition(draft => {
        draft.progressbarTranslateX = offsetWidth;
        draft.progressOffsetWidth = offsetWidth;
      });
    },
    [percent]
  );

  const changeBufferedWidth = useCallback(
    (percent: number) => {
      const barWidth = progressBar.current?.getBoundingClientRect().width;
      const offsetWidth = percent * barWidth;
      setPosition(draft => {
        draft.bufferedOffsetWidth = offsetWidth;
      });
    },
    [percent]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      let diffX = 0;
      mouse.startX = e.pageX;
      mouse.isDown = true;
      mouse.left = progress.current?.clientWidth;
      document.onmousemove = e => {
        e.preventDefault();
        if (!mouse.isDown) return;
        const _progressBar = progressBar.current;
        const progressBarWidth = _progressBar?.getBoundingClientRect().width;
        mouse.moveX = e.pageX;
        diffX = mouse.moveX - mouse.startX + mouse.left;
        if (diffX < 0) {
          diffX = 0;
        }
        if (diffX > progressBarWidth) {
          diffX = progressBarWidth;
        }
        setPosition(draft => {
          draft.progressbarTranslateX = diffX;
          draft.progressOffsetWidth = diffX;
        });
        percentChanged(Number(calcPercent(diffX)));
      };
      document.onmouseup = () => {
        if (!mouse.isDown) return;
        mouse.isDown = false;
        document.onmousemove = null;
        percentChanged(Number(calcPercent(diffX)));
      };
    },
    []
  );

  return (
    <div
      className={className ? `progress-bar ${className}` : 'progress-bar'}
      ref={progressBar}
      onClick={e => progressClick(e)}
      // v-resize:[debounceOptions].debounce="handleResize"
      // @click.prevent.stop="progressClick"
    >
      <div
        className="progress"
        ref={progress}
        style={{ width: `${position.progressOffsetWidth}px` }}
      ></div>
      <div
        className="buffered"
        ref={buffered}
        style={{ width: `${position.bufferedOffsetWidth}px` }}
      ></div>
      <div
        className={size === 'small' ? 'handle small' : 'handle'}
        onMouseDown={onMouseDown}
        style={{ transform: `translateX(${position.progressbarTranslateX}px)` }}
      >
        {
          // waiting
          waiting ? (
            <img src={loading} className="progress-waiting" />
          ) : (
            <div className="progress-btn"></div>
          )
        }
      </div>
      <div className="virtual-bar" ref={virtualBar}></div>
    </div>
  );
}

export default ProgressBar;
