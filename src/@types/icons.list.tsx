import {EIcons} from './../@enum/icons.enum';

export type IconsList = {
  readonly icon: keyof typeof EIcons;
  readonly text: string;
};
