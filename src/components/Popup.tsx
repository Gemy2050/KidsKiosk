import { X } from "lucide-react";

function Popup({ children }: { children: React.ReactNode }) {
  const hidePopup = () => {
    document.querySelector("#Popup")?.classList.remove("open");
    document.body.style.overflow = "auto";
  };
  return (
    <div
      id="Popup"
      className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 backdrop-blur-md z-50 scale-0 transition-transform duration-300"
    >
      <X
        size={30}
        className="text-red-600 cursor-pointer absolute top-3 left-3 z-20"
        onClick={hidePopup}
      />

      <div className="absolute w-[90%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}

export default Popup;
