import { ImageItem, RootState } from "./types";

export const INITIAL_STATE: RootState = {
  folders: {
    "default-folder": {
      name: "Untitled Folder",
      items: [],
    },
  },
  images: {},
  imagePreview: "",
  addImage: (image: ImageItem) => "",
  addFolder: (name: string) => {},
  moveImageToFolder: (imageId: string, folderId?: string) => {},
  setFolderItems: (folderId: string, items: string[]) => {},
  setImagePreview: (preview: string) => {},
};
