import { nanoid } from "nanoid";
import { ReactNode, createContext, useContext, useState } from "react";

type StoreProviderProps = {
  children: ReactNode;
};

const INITIAL_STATE = {
  folders: {
    'default-folder': {
        name: 'Untitled Folder',
        items: []
    }
  },
  images: {},
  addImage: (image: unknown) => {
    {
    }
  },
  addFolder: (name: string) => {
    {
    }
  },
};

const StoreContext = createContext(INITIAL_STATE);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [folders, setFolders] = useState(INITIAL_STATE.folders);
  const [images, setImages] = useState(INITIAL_STATE.images);

  const addImage = (image: unknown) => {
    const imageId = nanoid();
    setImages((prev) => ({ ...prev, [imageId]: image }));
  };

  const addFolder = (name: string) => {
    const folderId = nanoid();
    const folder = {
      name,
      items: [],
    };
    setFolders((prev) => ({ ...prev, [folderId]: folder }));
  };
  console.log({folders})
  const value = {
    folders,
    images,
    addImage,
    addFolder,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
