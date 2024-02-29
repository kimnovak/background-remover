import { Fragment } from "react";
import { useStore } from "../../store/StoreProvider";

const FileManager = () => {
  // TODO extract to hook
  const { folders, images } = useStore();
  return (
    <div>
      {Object.entries(folders).map(([folderId, folder]) => (
        <Fragment key={folderId}>
          <div>{folder.name}</div>
          <ul>
            {folder.items.map((imageId: string) => (
              <li key={imageId}>{images[imageId].name}</li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};

export default FileManager;
