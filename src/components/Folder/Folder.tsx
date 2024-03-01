import { FaFolder } from "react-icons/fa";
import "./Folder.css";

type FolderProps = {
  name: string;
};

const Folder = ({ name }: FolderProps) => {
  return (
    <div className="folder">
      <FaFolder color="white" className="icon" />
      {name}
    </div>
  );
};

export default Folder;
