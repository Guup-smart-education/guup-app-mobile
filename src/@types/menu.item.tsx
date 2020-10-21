import {EIcons} from './../@enum/icons.enum';

export type IMenuItemProps = {
  readonly text?: string;
  readonly onPress?: () => void;
  readonly disable?: boolean;
  readonly icon?: keyof typeof EIcons;
};
