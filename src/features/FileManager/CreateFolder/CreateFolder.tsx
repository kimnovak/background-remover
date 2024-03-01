import { useRef, useState } from "react";
import Popover from "../../../components/Popover/Popover";
import { useStore } from "../../../store/StoreProvider";
import "./CreateFolder.css";

const CreateFolder = () => {
  const createFolderBtnRef = useRef<HTMLButtonElement>(null);
  const [folderName, setFolderName] = useState("");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { addFolder } = useStore();

  const handleSubmit = () => {
    if (!folderName) {
      setErrorMessage("Folder name can't be empty!");
      return;
    }
    setErrorMessage("");
    addFolder(folderName);
  };

  return (
    <>
      <button
        data-testid="@create-folder/create-folder-btn"
        className="create-folder-btn"
        ref={createFolderBtnRef}
        onClick={() => setIsPopoverVisible((prev) => !prev)}
      >
        Create Folder
      </button>
      <Popover
        isVisible={isPopoverVisible}
        parentRef={createFolderBtnRef}
        close={() => setIsPopoverVisible(false)}
      >
        <label>Folder name:</label>
        <input
          data-testid="@create-folder/input"
          type="text"
          className="folder-input"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
        />
        {errorMessage && (
          <p
            data-testid="@create-folder/error-message"
            className="error-message"
          >
            {errorMessage}
          </p>
        )}
        <button
          data-testid="@create-folder/submit-btn"
          onClick={handleSubmit}
          className="add-folder-btn"
        >
          Add
        </button>
      </Popover>
    </>
  );
};

export default CreateFolder;
