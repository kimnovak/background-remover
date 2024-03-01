import { FaFile } from "react-icons/fa";
import "./File.css";

type FileProps = {
  name: string;
  onClick: () => void;
};

const File = ({ name, onClick }: FileProps) => {
  return (
    <div className="file" onClick={onClick}>
      <FaFile color="white" className="icon"/>
      {name}
    </div>
  );
};

export default File;
