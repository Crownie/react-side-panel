import React, {FunctionComponent, useCallback, useContext, useRef, useState} from 'react';
import {SidePanelItem, SidePanelStack} from '../SidePanelStack';
import {ExitEvent} from '../ExitEvent';

export interface PanelPageEvents {
  onBeforeExit: (event: ExitEvent) => void;
}

export interface SidePanelContextProps {
  push: (item: SidePanelItem) => void;
  pop: (force?: boolean) => void;
  popTo: (id: string, force?: boolean) => void;
  reset: (force?: boolean) => void;
  getItems: () => SidePanelItem[];
  resetTo: (item: SidePanelItem, force?: boolean) => void;
  item: SidePanelItem;
  direction: -1 | 0 | 1;
  collapse: (flag: boolean) => void;
  toggleCollapse: () => void;
  collapsed: boolean;
  ref: React.RefObject<PanelPageEvents>;
}

const SidePanelContext = React.createContext<SidePanelContextProps>({} as any);

interface SidePanelProviderProps {

}

const uid = () => new Date().getTime() + '' + Math.random();

export const SidePanelProvider: FunctionComponent<SidePanelProviderProps> = ({children}) => {

  const [, forceRender] = useState<string>();
  const stack = useRef(new SidePanelStack()).current;
  const previousLengthRef = useRef<number>(0);
  const directionRef = useRef<-1 | 0 | 1>(1);
  const [collapsed, setCollapsed] = useState(true);
  const ref = useRef<PanelPageEvents>(null);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, []);

  const collapse = useCallback((flag: boolean) => {
    setCollapsed(flag);
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

  const push = useCallback((item: SidePanelItem) => {
    stack.push(item);
    calculateDirection(stack.length);
    setCollapsed(false);
    forceRender(new Date().getTime() + '' + Math.random());
  }, [stack, calculateDirection]);

  const pop = useCallback((force?: boolean) => {
    const event = new ExitEvent();
    if(!force){
      ref.current?.onBeforeExit(event);
    }
    if (force || !event.isDefaultPrevented()) {
      stack.pop();
      calculateDirection(stack.length);
      setCollapsed(false);
      forceRender(uid());
    }
  }, [stack, calculateDirection]);

  const popTo = useCallback((id: string, force?: boolean) => {
    const event = new ExitEvent();
    if(!force){
      ref.current?.onBeforeExit(event);
    }
    if (force || !event.isDefaultPrevented()) {
      stack.popTo(id);
      setCollapsed(false);
      forceRender(uid());
    }
  }, [stack]);

  const reset = useCallback((force?: boolean) => {
    const event = new ExitEvent();
    if(!force){
      ref.current?.onBeforeExit(event);
    }
    stack.reset();
    if (force || !event.isDefaultPrevented()) {
      calculateDirection(stack.length);
      setCollapsed(false);
      forceRender(uid());
    }
  }, [stack, calculateDirection]);

  const getItems = useCallback(() => {
    return stack.getItems();
  }, [stack]);

  const resetTo = useCallback((item: SidePanelItem, force?: boolean) => {
    const event = new ExitEvent();
    if(!force){
      ref.current?.onBeforeExit(event);
    }
    stack.reset(item);
    if (force || !event.isDefaultPrevented()) {
      calculateDirection(stack.length);
      setCollapsed(false);
      forceRender(uid());
    }
  }, [stack, calculateDirection]);

  const direction = directionRef.current;

  const item = stack.top() || {};
  return <SidePanelContext.Provider
    value={{push, pop, popTo, reset, resetTo, getItems, item, direction, collapse, collapsed, toggleCollapse, ref}}>
    {children}
  </SidePanelContext.Provider>;
};

export const useSidePanel = () => {
  return useContext(SidePanelContext)
};
