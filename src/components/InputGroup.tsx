import { memo, useEffect, useState } from "react";
import FileInputButtons from "./FileInputButtons";

interface IProps {
  className?: string;
  children: React.ReactNode;
  imageUrl?: string;
  image?: File | null;
}

function InputGroup({ className, children, imageUrl: imgUrl, image }: IProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setFile(image || null);

    setImageUrl(imgUrl || null);
  }, [imgUrl, image]);
  return (
    <div className={`relative ${className}`} id="input-group">
      {children}
      {(file || imageUrl) && (
        <FileInputButtons {...{ file, setFile, setImageUrl }} />
      )}
    </div>
  );
}

export default memo(InputGroup);
