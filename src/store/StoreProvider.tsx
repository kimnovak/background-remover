import { nanoid } from "nanoid";
import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Folder, ImageItem } from "./types";

type StoreProviderProps = {
  children: ReactNode;
};

const INITIAL_STATE: {
  images: Record<string, ImageItem>;
  folders: Record<string, Folder>;
  addImage: (image: ImageItem) => void;
  addFolder: (name: string) => void;
  setFolders: React.Dispatch<SetStateAction<Record<string, Folder>>>;
} = {
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
  addImage: (image: ImageItem) => {
    {
    }
  },
  addFolder: (name: string) => {
    {
    }
  },
  setFolders: (folders: any) => {{}}
};

const StoreContext = createContext(INITIAL_STATE);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [folders, setFolders] = useState(INITIAL_STATE.folders);
  const [images, setImages] = useState<Record<string, ImageItem>>(
    INITIAL_STATE.images
  );

  const moveImageToFolder = (imageId: string, folderId = "default-folder") => {
    setFolders((prev) => ({
      ...prev,
      [folderId]: {
        ...prev[folderId],
        items: prev[folderId].items.concat(imageId),
      },
    }));
  };

  const addImage = (image: ImageItem) => {
    const imageId = nanoid();
    setImages((prev) => ({ ...prev, [imageId]: image }));
    moveImageToFolder(imageId);
  };

  const addFolder = (name: string) => {
    const folderId = nanoid();
    const folder = {
      name,
      items: [],
    };
    setFolders((prev) => ({ ...prev, [folderId]: folder }));
  };

  const value = {
    folders,
    images,
    addImage,
    addFolder,
    setFolders,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
