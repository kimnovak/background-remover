import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { INITIAL_STATE } from "./utils";
import { useImages } from "./hooks/useImages";
import { useFolders } from "./hooks/useFolders";

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreContext = createContext(INITIAL_STATE);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const { images, addImage } = useImages();
  const { folders, addFolder, moveImageToFolder, setFolderItems } = useFolders();
  const [imagePreview, setImagePreview] = useState("");

  const value = {
    folders,
    images,
    imagePreview,
    addImage,
    addFolder,
    setImagePreview,
    moveImageToFolder,
    setFolderItems
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
