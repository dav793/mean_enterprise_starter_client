
export interface IToolbarConfig {
  label?: string;
  items: { [key: string]: IToolbarItem };
  itemAlignment: ToolbarItemAlignment;
}

export interface IToolbarItem {
  type: ToolbarItemType;
  label?: string;
  classes?: string[];
  isHidden?: boolean;
  isDisabled?: boolean;
}

export interface IToolbarEvent {
  type: ToolbarEventType;
  itemName: string;
  payload?: any;
}

export enum ToolbarItemType {
  BUTTON = 'button'
}

export enum ToolbarItemAlignment {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum ToolbarEventType {
  BUTTON_CLICK = 'button-click'
}
