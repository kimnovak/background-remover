import { nanoid } from "nanoid";
import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import localforage from "localforage";
import { Folder, ImageItem } from "./types";

type StoreProviderProps = {
  children: ReactNode;
};

const INITIAL_STATE: {
  images: Record<string, ImageItem>;
  imagePreview: string;
  folders: Record<string, Folder>;
  addImage: (image: ImageItem) => void;
  addFolder: (name: string) => void;
  setImagePreview: (preview: string) => void;
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
  imagePreview: "",
  addImage: (image: ImageItem) => {},
  addFolder: (name: string) => {},
  setFolders: (folders: SetStateAction<Record<string, Folder>>) => {},
  setImagePreview: (preview: string) => {},
};

const StoreContext = createContext(INITIAL_STATE);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [folders, setFolders] = useState(INITIAL_STATE.folders);
  const [images, setImages] = useState<Record<string, ImageItem>>(
    INITIAL_STATE.images
  );
  const [imagePreview, setImagePreview] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);

  const hydrateFolders = async () => {
    try {
      const folders: Record<string, Folder> | null = await localforage.getItem(
        "folders"
      );
      console.log({ folders });
      if (folders) {
        setFolders(folders);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const hydrateImages = async () => {
    try {
      const images: Record<string, ImageItem> | null =
        await localforage.getItem("images");

      if (images) {
        setImages(images);
        hydrateFolders();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    localforage.setItem("folders", folders);
  }, [folders]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    localforage.setItem("images", images);
  }, [images]);

  useEffect(() => {
    hydrateImages();
    setIsFirstRender(false);
  }, []);

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
    imagePreview,
    addImage,
    addFolder,
    setFolders,
    setImagePreview,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
