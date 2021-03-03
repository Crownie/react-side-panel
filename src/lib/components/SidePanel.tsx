import React, {
  createRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import Backdrop from './Backdrop';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {
  PanelPageEvents,
  useSidePanel,
  useSidePanelState,
} from './SidePanelProvider';
import styled from 'styled-components';
import {ResizableBox, ResizableBoxProps} from 'react-resizable';
import CollapseButton from './CollapseButton';

export const useSidePanelItem = (listeners: PanelPageEvents | null) => {
  const {onBeforeExit} = listeners || {};
  const context = useSidePanel();
  const dummyRef = useRef<any>(null);
  useImperativeHandle(
    onBeforeExit ? context.ref : dummyRef,
    () => {
      return {onBeforeExit};
    },
    [onBeforeExit],
  );
  return context;
};

interface SidePanelProps {
  className?: string;
  minWidth?: number;
  maxWidth?: number;
  height?: string | number;
  zIndex?: number;
}

export const SidePanel: FunctionComponent<SidePanelProps> = ({
  className,
  height = '100%',
  minWidth = 350,
  maxWidth = 700,
  zIndex = 99999,
  children,
}) => {
  const {reset, pop, toggleCollapse} = useSidePanel();
  const {item, direction, collapsed} = useSidePanelState();
  const {id, node, modal} = item || {};
  const defaultChildrenKey = 'default-children-key';
  const key = id ? id : defaultChildrenKey;

  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useMemo(() => {
    return createRef<any>();
  }, [key]);

  height =
    typeof height === 'number'
      ? `${height}px !important`
      : `${height} !important`;


  useEffect(() => {
    // reset stack when side panel is unmounting
    return () => {
      reset();
    };
  }, [reset]);

  const onClickOutside = useCallback(() => {
    pop();
  }, [pop]);

  return (
    <ResizableBox$
      className={collapsed ? `${className} collapsed` : className}
      width={minWidth}
      height={height}
      axis={'x'}
      minConstraints={[minWidth, Infinity]}
      maxConstraints={[maxWidth, Infinity]}
      resizeHandles={['w']}
      zIndex={zIndex}
    >
      <>
        <CollapseButton onClick={toggleCollapse} collapsed={collapsed} />
        {modal && <Backdrop onClick={onClickOutside} />}
        <Wrapper$ ref={containerRef}>
          <TransitionGroup
            className={
              direction > 0 ? 'right' : direction < 0 ? 'left' : undefined
            }
          >
            <CSSTransition
              key={key}
              classNames="fade"
              timeout={{
                appear: 500,
                enter: 3000,
                exit: 5000,
              }}
              nodeRef={ref}
            >
              <div id={key} className="panel-page" ref={ref} key={key}>
                {node || children}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Wrapper$>
      </>
    </ResizableBox$>
  );
};

/**
 * passing modifying the component to allow height to accept string
 */
const ResizableBox$ = styled<
  FunctionComponent<ResizableBoxProps & {height: any; zIndex: number}>
>(({height, zIndex, ...props}) => <ResizableBox height={300} {...props} />)`
  position: relative;
  right: 0;
  height: ${({height}) => height};
  background: #fff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transition: width 300ms;
  z-index: ${({zIndex}) => zIndex};

  .react-draggable-transparent-selection & {
    transition: none;
  }

  .react-resizable-handle {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
    z-index: 2;
    background: rgba(214, 214, 214, 0);
    cursor: col-resize;

    :hover {
      background: #b1b1b1;
    }
  }

  &.collapsed {
    width: 0 !important;
  }
`;

const Wrapper$ = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;

  > div {
    height: 100%;
    width: 100%;
  }

  .panel-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-exit {
    opacity: 1;
    pointer-events: none;
  }

  .fade-enter-active {
    opacity: 1;
    z-index: 1;
  }

  .fade-exit-active {
    opacity: 0;
    pointer-events: none;
  }

  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms, transform 500ms;
  }

  .right {
    .fade-enter {
      transform: translateX(100%);
    }

    .fade-enter-active {
      transform: translateX(0%);
    }

    .fade-exit {
      transform: translateX(0%);
    }

    .fade-exit-active {
      transform: translateX(-100%);
    }
  }

  .left {
    .fade-enter {
      transform: translateX(-100%);
    }

    .fade-enter-active {
      transform: translateX(0%);
    }

    .fade-exit {
      transform: translateX(0%);
    }

    .fade-exit-active {
      transform: translateX(100%);
    }
  }
`;
