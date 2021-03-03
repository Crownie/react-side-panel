import {ReactNode} from 'react';

export interface SidePanelItem {
  id: string;
  node: ReactNode;
  modal?: boolean;
}

export class SidePanelStack {
  private items: SidePanelItem[] = [];

  get length() {
    return this.items.length;
  }

  getItems() {
    return this.items;
  }

  push(item: SidePanelItem) {
    const topItem = this.top();
    if (topItem?.id === item.id) {
      this.replace(item);
    } else {
      this.items.push(item);
    }
  }

  pop() {
    this.items.pop();
  }

  replace(item: SidePanelItem) {
    this.items.pop();
    this.items.push(item);
  }

  top() {
    const lastIndex = Math.max(this.items.length - 1, 0);
    return this.items[lastIndex];
  }

  reset(item?: SidePanelItem) {
    this.items = item ? [item] : [];
  }

  popTo(id: string) {
    const index = this.items.findIndex((item) => (item.id === id));
    if (index >= 0) {
      this.items = this.items.slice(0, index + 1);
    }
  }
}
