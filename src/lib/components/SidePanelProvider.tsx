import React, {
  FunctionComponent,
  useCallback,
  useContext, useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {SidePanelItem, SidePanelStack} from '../SidePanelStack';
import {ExitEvent} from '../ExitEvent';
import {SidePanelActionsContext} from './context/SidePanelActionsContext';
import {SidePanelStateContext} from './context/SidePanelStateContext';

export interface PanelPageEvents {
  onBeforeExit: (event: ExitEvent) => void;
}
const PANEL_COLLAPSED_STORAGE_KEY='side_panel_collapsed';

const supportsLocalStorage = 'localStorage' in window && window['localStorage'] !== null;
const saveCollapseState = (collapsed:boolean)=>{
  if(supportsLocalStorage){
    if(collapsed){
      localStorage.setItem(PANEL_COLLAPSED_STORAGE_KEY,'1');
    }else{
      localStorage.removeItem(PANEL_COLLAPSED_STORAGE_KEY);
    }
  }
}

const getSavedCollapseState = () =>{
  if(!supportsLocalStorage){
    return false;
  }
  return localStorage.getItem(PANEL_COLLAPSED_STORAGE_KEY)==='1';
};

interface SidePanelProviderProps {}

export const SidePanelProvider: FunctionComponent<SidePanelProviderProps> = ({
  children,
}) => {
  const [, forceRender] = useState<Object>();
  const stackRef = useRef(new SidePanelStack());
  const previousLengthRef = useRef<number>(0);
  const directionRef = useRef<-1 | 0 | 1>(1);
  const [collapsed, setCollapsed] = useState(getSavedCollapseState());
  const ref = useRef<PanelPageEvents|null>(null);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const collapse = useCallback((flag: boolean) => {
    setCollapsed(flag);
  }, []);

  useEffect(()=>{
    saveCollapseState(collapsed);
  },[collapsed]);

  const clearListeners = useCallback(() => {
      ref.current = null;
  }, []);

  const calculateDirection = useCallback((len: number) => {
    if (len > previousLengthRef.current) {
      directionRef.current = 1;
    } else if (len < previousLengthRef.current) {
      directionRef.current = -1;
    } else {
      directionRef.current = 0;
    }
    previousLengthRef.current = len;
  }, []);

  const push = useCallback(
    (item: SidePanelItem) => {
      stackRef.current.push(item);
      calculateDirection(stackRef.current.length);
      setCollapsed(false);
      forceRender({});
    },
    [calculateDirection],
  );

  const replace = useCallback(
    (item: SidePanelItem) => {
      stackRef.current.replace(item);
      calculateDirection(stackRef.current.length);
      setCollapsed(false);
      forceRender({});
    },
    [calculateDirection],
  );

  const pop = useCallback(
    (force?: boolean) => {
      const event = new ExitEvent();
      if (!force) {
        ref.current?.onBeforeExit(event);
      }
      if (force || !event.isDefaultPrevented()) {
        stackRef.current.pop();
        clearListeners();
        calculateDirection(stackRef.current.length);
        setCollapsed(false);
        forceRender({});
      }
    },
    [calculateDirection, clearListeners],
  );

  const popTo = useCallback((id: string, force?: boolean) => {
    const event = new ExitEvent();
    if (!force) {
      ref.current?.onBeforeExit(event);
    }
    if (force || !event.isDefaultPrevented()) {
      stackRef.current.popTo(id);
      clearListeners();
      setCollapsed(false);
      forceRender({});
    }
  }, [clearListeners]);

  const reset = useCallback(
    (force?: boolean) => {
      const event = new ExitEvent();
      if (!force) {
        ref.current?.onBeforeExit(event);
      }
      if (force || !event.isDefaultPrevented()) {
        stackRef.current.reset();
        clearListeners();
        calculateDirection(stackRef.current.length);
        setCollapsed(false);
        forceRender({});
      }
    },
    [calculateDirection, clearListeners],
  );

  const getItems = useCallback(() => {
    return stackRef.current.getItems();
  }, []);

  const resetTo = useCallback(
    (item: SidePanelItem, force?: boolean) => {
      const event = new ExitEvent();
      if (!force) {
        ref.current?.onBeforeExit(event);
      }
      stackRef.current.reset(item);
      if (force || !event.isDefaultPrevented()) {
        calculateDirection(stackRef.current.length);
        setCollapsed(false);
        forceRender({});
      }
    },
    [calculateDirection],
  );

  const actions = useMemo(
    () => ({
      push,
      pop,
      popTo,
      reset,
      resetTo,
      replace,
      getItems,
      collapse,
      toggleCollapse,
      ref
    }),
    [push, pop, popTo, reset, resetTo, replace, getItems, collapse, toggleCollapse],
  );

  const direction = directionRef.current;

  const item = stackRef.current.top() || {};
  return (
    <SidePanelStateContext.Provider
      value={{
        item,
        direction,
        collapsed,
      }}
    >
      <SidePanelActionsContext.Provider value={actions}>
        {children}
      </SidePanelActionsContext.Provider>
    </SidePanelStateContext.Provider>
  );
};

export const useSidePanel = () => {
  return useContext(SidePanelActionsContext);
};

export const useSidePanelState = ()=>{
  return useContext(SidePanelStateContext)
}
