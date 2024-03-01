import { ChangeEvent } from "react";
import { FaUpload } from "react-icons/fa";
import "./UploadButton.css";

export default function UploadButton({
  onImageAdd,
}: {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <label className="add-button" htmlFor="customFileAdd">
      <input
        type="file"
        onChange={onImageAdd}
        hidden
        id="customFileAdd"
        accept=".png, .jpg, .jpeg"
      />
      <FaUpload fill="white" size={24} />
      Upload
    </label>
  );
}
