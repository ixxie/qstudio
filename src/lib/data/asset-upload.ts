export interface AssetUploadFileValidation {
  message: string;
  file: File;
}

export interface AssetUploadFormValidation {
  passed: AssetUploadFileValidation[];
  failed: AssetUploadFileValidation[];
}
