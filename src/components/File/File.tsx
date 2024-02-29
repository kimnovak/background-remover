import { FaFile } from "react-icons/fa";
import "./File.css";

type FileProps = {
  name: string;
};

const File = ({ name }: FileProps) => {
  return (
    <div className="file">
      <FaFile color="white" />
      {name}
    </div>
  );
};

export default File;
