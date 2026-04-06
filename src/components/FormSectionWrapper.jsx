import { IoAddCircleOutline } from "react-icons/io5";
import HtmlText from "../utils/HtmlText";

export default function FormSectionWrapper({
  title,
  description,
  children,
  showButton = false,
  onButtonClick,
  buttonText = "Tambah",
}) {
  return (
    <div className="bg-white p-7.5 rounded-[10px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 md:gap-3 mb-1">
        <div className="flex flex-col gap-1">
          <h2 className="inter text-[15px] font-semibold text-[#000405]">
            {title}
          </h2>
          {description && (
            <HtmlText
              html={description}
              className="inter text-xs text-[#000405]/60 mb-4"
            />
          )}
        </div>


        {showButton && (
          <div className="self-end sm:self-auto">
            <button
              onClick={onButtonClick}
              type="button"
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

      <hr className="border-[#D9D9D9]/80 mb-6" />

      <div className="flex flex-col">{children}</div>
    </div>
  );
}
