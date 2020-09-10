export type Owner = {
  readonly ownerName: string;
  readonly ownerProsiffion?: string;
  readonly ownerPicture?: string;
};

export type PostProps = {
  readonly id: string;
  readonly owner: Owner;
  readonly postComment: string | undefined;
  readonly menu?: boolean;
  readonly ratingValue?: string | undefined;
  readonly navigateProfile?: boolean;
  readonly showComments?: boolean;
  readonly navigateComments?: boolean;
  readonly comments?: number;
  readonly media?: boolean;
};
