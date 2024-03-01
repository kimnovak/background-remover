import { useEffect, useState } from "react";
import { INITIAL_STATE } from "../utils";
import localforage from "localforage";
import { Folder } from "../types";

const hydrateFolders = async () => {
  try {
    const folders: Record<string, Folder> | null = await localforage.getItem(
      "folders"
    );
    return folders || INITIAL_STATE.folders;
  } catch (e) {
    console.error(e);
    return INITIAL_STATE.folders;
  }
};

export const useFolders = () => {
  const [folders, setFolders] = useState(INITIAL_STATE.folders);
  const [hasRehydrated, setHasRehydrated] = useState(false);

  const loadFromStorage = async () => {
    const folders = await hydrateFolders();
    setFolders(folders);
    setHasRehydrated(true);
  };

  useEffect(() => {
    if (!hasRehydrated) {
      loadFromStorage();
      return;
    }
    try {
      localforage.setItem("folders", folders);
    } catch (e) {
      console.error("Failed persisting folders");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders]);

  const moveImageToFolder = (imageId: string, folderId = "default-folder") => {
    setFolders((prev) => ({
      ...prev,
      [folderId]: {
        ...prev[folderId],
        items: prev[folderId].items.concat(imageId),
      },
    }));
  };

  const addFolder = (name: string) => {
    const folderId = Math.random().toString().substring(2);
    const folder = {
      name,
      items: [],
    };
    setFolders((prev) => ({ ...prev, [folderId]: folder }));
  };

  const setFolderItems = (folderId: string, items: string[]) => {
    const targetFolder = folders[folderId];
    setFolders((prev) => ({ ...prev, [folderId]: { ...targetFolder, items } }));
  };

  return {
    folders,
    addFolder,
    moveImageToFolder,
    setFolderItems,
  };
};
