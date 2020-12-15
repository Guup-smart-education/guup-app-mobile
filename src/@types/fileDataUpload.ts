interface Source {
  readonly uri: string;
}
export interface IFileDatUpload {
  readonly uri: string;
  readonly type: string;
  readonly fileSize: number;
  readonly width?: number;
  readonly height?: number;
}

export interface IFileImagePicker {
  readonly source: Source;
  readonly fileUploadInfo: IFileDatUpload;
}
