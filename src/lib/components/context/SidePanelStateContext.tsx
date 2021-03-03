import { SidePanelItem } from "../../SidePanelStack";
import React from "react";

export interface SidePanelStateContextProps {
  item: SidePanelItem;
  direction: -1 | 0 | 1;
  collapsed: boolean;
}

export const SidePanelStateContext = React.createContext<SidePanelStateContextProps>(
  {} as any,
);
