import { nanoid } from "nanoid";
import { ReactNode, createContext, useContext, useState } from "react";

type StoreProviderProps = {
  children: ReactNode;
};

const INITIAL_STATE = {
  images: {},
  addImage: (image: unknown) => {
    {
    }
  },
};

const StoreContext = createContext(INITIAL_STATE);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [images, setImages] = useState(INITIAL_STATE.images);

  const addImage = (image: unknown) => {
    const imageId = nanoid();
    setImages((prev) => ({ ...prev, [imageId]: image }));
  };

  const value = {
    images,
    addImage,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
