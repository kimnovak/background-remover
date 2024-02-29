import { ChangeEvent, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";
import loadImage, { LoadImageResult } from "blueimp-load-image";
import { BASE64_IMAGE_HEADER } from "../../constants";
import { useStore } from "../../store/StoreProvider";
import * as api from "../../api/removeBackground";
import "./BackgroundRemover.css";
import Preview from "../../components/Preview/Preview";

const BackgrounRemover = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addImage } = useStore();
  const [hasError, setHasError] = useState(false);

  let uploadImageToServer = (file: File) => {
    setIsLoading(true);
    setResult(null);
    loadImage(file, {
      maxWidth: 400,
      maxHeight: 400,
      canvas: true,
    })
      .then(async (imageData: LoadImageResult) => {
        const image = imageData.image as HTMLCanvasElement;

        const imageBase64 = image.toDataURL("image/png");
        const imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, "");
        const data = {
          image_file_b64: imageBase64Data,
        };
        const result = await api.removeBackground(data);
        const base64Result = BASE64_IMAGE_HEADER + result.result_b64;
        setResult(base64Result);
        addImage({
          name: file.name,
          originalBase64: imageBase64,
          resultBase64: base64Result,
        });
      })

      .catch((error) => {
        setHasError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  let onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImageToServer(e.target.files[0]);
    } else {
      console.error("No file was picked");
    }
  };

  return (
    <div className="background-remover">
      <AddButton onImageAdd={onImageAdd} />
      <div className="preview-container">
        <Preview imageSrc={result} hasError={hasError} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BackgrounRemover;
