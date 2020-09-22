export type Owner = {
  readonly ownerName?: string | undefined | null;
  readonly ownerProsiffion?: string | undefined | null;
  readonly ownerPicture?: string | undefined | null;
};

export type PostProps = {
  readonly id?: string | undefined | null;
  readonly owner?: Owner | undefined | null;
  readonly postComment?: string | undefined | null;
  readonly menu?: boolean | undefined | null;
  readonly ratingValue?: string | undefined | null;
  readonly navigateProfile?: boolean | undefined | null;
  readonly showComments?: boolean | undefined | null;
  readonly navigateComments?: boolean | undefined | null;
  readonly comments?: number | undefined | null;
  readonly media?: string | undefined | null;
};
