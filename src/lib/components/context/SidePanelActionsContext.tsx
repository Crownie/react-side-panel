import React from "react";
import { SidePanelItem } from "../../SidePanelStack";
import { PanelPageEvents } from "../SidePanelProvider";

export interface SidePanelActionsContextProps{
  push: (item: SidePanelItem) => void;
  /**
   * replace current panel
   * @param item
   */
  replace: (item: SidePanelItem) => void;
  pop: (force?: boolean) => void;
  /**
   * Pop stack until the specified panel id is reached
   * @param id
   * @param force
   */
  popTo: (id: string, force?: boolean) => void;
  reset: (force?: boolean) => void;
  getItems: () => SidePanelItem[];
  /**
   * clear entire stack and push the specified panel
   * @param item
   * @param force
   */
  resetTo: (item: SidePanelItem, force?: boolean) => void;
  collapse: (flag: boolean) => void;
  toggleCollapse: () => void;
  ref: React.RefObject<PanelPageEvents|null>;
}
export const SidePanelActionsContext = React.createContext<SidePanelActionsContextProps>({} as any);
