import React from "react";
import { SidePanelItem } from "../../SidePanelStack";
import { PanelPageEvents } from "../SidePanelProvider";

export interface SidePanelActionsContextProps{
  push: (item: SidePanelItem) => void;
  pop: (force?: boolean) => void;
  popTo: (id: string, force?: boolean) => void;
  reset: (force?: boolean) => void;
  getItems: () => SidePanelItem[];
  resetTo: (item: SidePanelItem, force?: boolean) => void;
  collapse: (flag: boolean) => void;
  toggleCollapse: () => void;
  ref: React.RefObject<PanelPageEvents|null>;
}
export const SidePanelActionsContext = React.createContext<SidePanelActionsContextProps>({} as any);
