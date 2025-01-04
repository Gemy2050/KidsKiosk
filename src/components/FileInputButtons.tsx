import { Eye, Trash2 } from "lucide-react";

interface IProps {
  file: File | null;
  setFile: (file: File | null) => void;
  setImageUrl: (url: string) => void;
}

function FileInputButtons({ file, setFile, setImageUrl }: IProps) {
  const handleClearFile = () => {
    const input = document.querySelector(
      "input[type='file']"
    ) as HTMLInputElement;
    input.value = "";
    setFile(null);
    setImageUrl("");
  };

  const openPopup = () => {
    document.querySelector("#Popup")?.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="bg-white w-[98%] h-[85%] ps-2 p-1 absolute justify-between space-x-2 right-[1%] top-1/2 -translate-y-1/2  z-10 flex items-center">
      <span className="line-clamp-1 text-ellipsis">
        {file ? file.name : "image"}
      </span>
      <div className="h-full  flex items-center space-x-2">
        <Eye
          size={18}
          className="text-gray-500 cursor-pointer"
          onClick={openPopup}
        />
        <Trash2
          size={18}
          className="text-red-500 cursor-pointer"
          id="clearImage"
          onClick={handleClearFile}
        />
      </div>
    </div>
  );
}

export default FileInputButtons;
