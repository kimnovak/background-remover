export type ImageItem = {
  name: string;
  originalBase64: string;
  resultBase64: string;
};

export type Folder = {
  name: string;
  items: string[];
};

export type RootState = {
  images: Record<string, ImageItem>;
  imagePreview: string;
  folders: Record<string, Folder>;
  addImage: (image: ImageItem) => string;
  addFolder: (name: string) => void;
  moveImageToFolder: (imageId: string, folderId?: string) => void;
  setImagePreview: (preview: string) => void;
  setFolderItems: (folderId: string, items: string[]) => void,
};
