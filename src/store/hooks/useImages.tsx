import { useEffect, useState } from "react";
import localforage from "localforage";
import { INITIAL_STATE } from "../utils";
import { ImageItem } from "../types";

const hydrateImages = async () => {
  try {
    const images: Record<string, ImageItem> | null = await localforage.getItem(
      "images"
    );

    return images || INITIAL_STATE.images;
  } catch (e) {
    console.error(e);
    return INITIAL_STATE.images;
  }
};

export const useImages = () => {
  const [images, setImages] = useState<Record<string, ImageItem>>(
    INITIAL_STATE.images
  );
  const [hasRehydrated, setHasRehydrated] = useState(false);

  const loadFromStorage = async () => {
    const images = await hydrateImages();
    setImages(images);
    setHasRehydrated(true);
  };

  const saveToStorage = async () => {
    try {
      await localforage.setItem("images", images);
    } catch (e) {
      console.error("Failed persisting images");
    }
  };

  useEffect(() => {
    if (!hasRehydrated) {
      loadFromStorage();
      return;
    }
    saveToStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, hasRehydrated]);

  const addImage = (image: ImageItem) => {
    const imageId = Math.random().toString().substring(2);
    setImages((prev) => ({ ...prev, [imageId]: image }));
    return imageId;
  };

  return {
    images,
    addImage,
  };
};
