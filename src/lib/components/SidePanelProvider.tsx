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
  onBeforeExit: (event: ExitEvent) => Promise<void>;
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

  const commit = useCallback(() => {
    ref.current = null;
    calculateDirection(stackRef.current.length);
    setCollapsed(false);
    forceRender({});
  }, [calculateDirection]);

  const push = useCallback(
    (item: SidePanelItem) => {
      stackRef.current.push(item);
      commit();
    },
    [commit],
  );

  const replace = useCallback(
    (item: SidePanelItem) => {
      stackRef.current.replace(item);
      commit();
    },
    [commit],
  );

  const pop = useCallback(
    async (force?: boolean) => {
      const event = new ExitEvent();
      if (!force) {
        await ref.current?.onBeforeExit(event);
      }
      if (force || !event.isDefaultPrevented()) {
        stackRef.current.pop();
        commit();
        return true;
      }
      return false;
    },
    [commit],
  );

  const popTo = useCallback(async (id: string, force?: boolean) => {
    const event = new ExitEvent();
    if (!force) {
      await ref.current?.onBeforeExit(event);
    }
    if (force || !event.isDefaultPrevented()) {
      stackRef.current.popTo(id);
      commit();
      return true;
    }
    return false;
  }, [commit]);

  const reset = useCallback(
    async (force?: boolean) => {
      const event = new ExitEvent();
      if (!force) {
        await ref.current?.onBeforeExit(event);
      }
      if (force || !event.isDefaultPrevented()) {
        stackRef.current.reset();
        commit();
        return true;
      }
      return false;
    },
    [commit],
  );

  const getItems = useCallback(() => {
    return stackRef.current.getItems();
  }, []);

  const resetTo = useCallback(
    async (item: SidePanelItem, force?: boolean) => {
      const event = new ExitEvent();
      if (!force) {
        await ref.current?.onBeforeExit(event);
      }
      if (force || !event.isDefaultPrevented()) {
        stackRef.current.reset(item);
        calculateDirection(stackRef.current.length);
        setCollapsed(false);
        forceRender({});
        return true;
      }
      return false;
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
