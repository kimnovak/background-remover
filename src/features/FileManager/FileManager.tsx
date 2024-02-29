import { useStore } from "../../store/StoreProvider";

const FileManager = () => {
  // TODO extract to hook
  const { folders } = useStore();
  return (
    <div>
      {Object.entries(folders).map(([key, folder]) => (
        <div key={key}>{folder.name}</div>
      ))}
    </div>
  );
};

export default FileManager;
