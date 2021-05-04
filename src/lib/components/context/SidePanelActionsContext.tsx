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
  pop: (force?: boolean) => Promise<boolean>;
  /**
   * Pop stack until the specified panel id is reached. Returns true if the action is successful
   * @param id
   * @param force
   */
  popTo: (id: string, force?: boolean) => Promise<boolean>;
  /**
   * Clears the stack to show only the default component. Returns true if the action is successful
   * @param force
   */
  reset: (force?: boolean) => Promise<boolean>;
  getItems: () => SidePanelItem[];
  /**
   * clear entire stack and push the specified panel. Returns true if the action is successful
   * @param item
   * @param force
   */
  resetTo: (item: SidePanelItem, force?: boolean) => Promise<boolean>;
  collapse: (flag: boolean) => void;
  toggleCollapse: () => void;
  ref: React.RefObject<PanelPageEvents|null>;
}
export const SidePanelActionsContext = React.createContext<SidePanelActionsContextProps>({} as any);
