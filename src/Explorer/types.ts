export interface File {
  type: "file";
  name: string;
  meta: string;
}

export interface Folder {
  type: "folder";
  name: string;
  data: (File | Folder)[];
}
