export type ImageFileTypes =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "image/gif"
  | "image/bmp"
  | "image/tiff"
  | "image/webp"
  | "image/svg+xml";

export type DocumentFileTypes =
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/rtf"
  | "text/plain"
  | "text/csv"
  | "application/zip"
  | "application/x-rar-compressed"
  | "application/x-7z-compressed"
  | "application/x-tar"
  | "application/json"
  | "application/xml";

export type AllFileTypes =
  | ImageFileTypes
  | DocumentFileTypes
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | "video/mp4"
  | "video/x-msvideo"
  | "video/x-ms-wmv"
  | "video/quicktime";
