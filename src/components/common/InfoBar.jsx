import { IoMdInformation } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

export default function InfoBar({
  message,
  buttonText,
  onButtonClick,
  showButton = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-md p-5 gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="rounded-full bg-gradient-to-r from-primary-orange to-primary-red">
          <IoMdInformation className="text-white w-6 h-6" />
        </div>
        <div className="text-xs font-semibold inter text-[#000000]/40">
          {message}
        </div>
      </div>

      {showButton && (
        <div className="self-end sm:self-auto">
          <button
            onClick={onButtonClick}
            className="flex items-center gap-1 inter text-[15px] font-medium group"
          >
            <IoAddCircleOutline className="w-5 h-5 text-primary-red" />
            <span className="relative bg-gradient-to-b from-primary-orange to-primary-red bg-clip-text text-transparent after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-[#E45E14] after:to-[#CA2323] group-hover:after:w-full after:transition-all after:duration-300">
              {buttonText}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
