import { ChangeEvent } from "react";
import start from "../../assets/images/startButton.svg";
import './AddButton.css';

export default function AddButton({
  onImageAdd,
}: {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div className="add-button-wrapper">
      <label className="add-button-label" htmlFor="customFileAdd">
        <input
          type="file"
          onChange={onImageAdd}
          hidden
          id="customFileAdd"
          accept=".png, .jpg, .jpeg"
        />
        <img src={start} alt="Plus sign" className="add-button-image" />
      </label>
    </div>
  );
}
