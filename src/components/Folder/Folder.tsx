import { FaFolder } from "react-icons/fa";

type FolderProps = {
  name: string;
};

const Folder = ({ name }: FolderProps) => {
  return <div><FaFolder />{name}</div>;
};

export default Folder;
