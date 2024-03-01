import { FaSadTear, FaSpinner } from "react-icons/fa";
import "./Preview.css";

type PreviewProps = {
  isLoading: boolean;
  hasError: boolean;
  imageSrc: string | null;
};

const Preview = ({ isLoading, hasError, imageSrc }: PreviewProps) => {
  if (isLoading) {
    return (
      <div className="spinner">
        <FaSpinner size={48} fill="var(--primary-color)" />
      </div>
    );
  }

  if (hasError && !imageSrc) {
    return (
      <div className="error-container">
        <FaSadTear size={24} fill="var(--primary-color)" /> Oh oh something went
        wrong, please try again
      </div>
    );
  }

  if (!imageSrc) {
    return <div>Upload an image to get started</div>;
  }

  return <img src={imageSrc!} alt="result from the API" />;
};

export default Preview;
