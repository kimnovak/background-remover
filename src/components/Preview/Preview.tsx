type PreviewProps = {
  isLoading: boolean;
  hasError: boolean;
  imageSrc: string | null;
};

const Preview = ({ isLoading, hasError, imageSrc }: PreviewProps) => {
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (hasError && !imageSrc) {
    return <div>Oh oh something went wrong, please try again</div>;
  }

  if (!imageSrc) {
    return <div>Upload an image to get started</div>;
  }

  return <img src={imageSrc!} alt="result from the API" />;
};

export default Preview;
