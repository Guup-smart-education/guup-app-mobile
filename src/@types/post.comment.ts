import {EModel} from './../@enum/model.type';

export type Owner = {
  readonly id?: string | undefined | null;
  readonly ownerName?: string | undefined | null;
  readonly ownerProsiffion?: string | undefined | null;
  readonly ownerPicture?: string | undefined | null;
};

export type PostProps = {
  readonly id?: string | undefined | null;
  readonly model?: keyof typeof EModel;
  readonly owner?: Owner | undefined | null;
  readonly postComment?: string | undefined | null;
  readonly menu?: boolean | undefined | null;
  readonly ratingValue?: string | undefined | null;
  readonly navigateProfile?: boolean | undefined | null;
  readonly showComments?: boolean | undefined | null;
  readonly navigateComments?: boolean | undefined | null;
  readonly comments?: number | undefined | null;
  readonly claps?: Array<any> | undefined | null;
  readonly clapsCount?: number | undefined | null;
  readonly clapped?: boolean | undefined | null;
  readonly media?: string | undefined | null;
  readonly card?: boolean | undefined | null;
  readonly createdAt?: string | undefined | null;
  readonly onRemove: (key: string) => void;
  readonly loading?: boolean;
};
