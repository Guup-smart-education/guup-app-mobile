import {ImageGains} from './../@enum/image.enum';

export type GainProps = {
  readonly gainIcon?: keyof typeof ImageGains;
  readonly gainTitle: string;
  readonly gainDescription: string;
};
