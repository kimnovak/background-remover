import { ImageItem, RootState } from "./types";

export const INITIAL_STATE: RootState = {
  folders: {
    "default-folder": {
      name: "Untitled Folder",
      items: [],
    },
    "default-folder-1": {
      name: "Untitled Folder 1",
      items: [],
    },
  },
  images: {},
  imagePreview: "",
  addImage: (image: ImageItem) => '',
  addFolder: (name: string) => {},
  moveImageToFolder: (imageId: string, folderId?: string) => {},
  setFolderItems: (folderId: string, items: string[]) => {},
  setImagePreview: (preview: string) => {},
};
