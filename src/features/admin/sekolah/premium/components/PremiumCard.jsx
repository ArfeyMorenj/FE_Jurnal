import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PremiumCard({
  id,
  title,
  subtitle,
  price,
  masa = "",
  featuresLeft = [],
  featuresRight = [],
  buttonText,
  isFree = false,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isFree) return;
    navigate(`/sekolah/checkout-premium/${id}`);
  };

  return (
    <div
      className={`relative z-10 bg-white rounded-3xl p-6 sm:p-8 
      pb-28 sm:pb-20
      w-full max-w-[520px] mx-auto 
      min-h-[270px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] 
      overflow-hidden flex flex-col`}
    >
      {/* Background art */}
      <img
        src="/images/box2.png"
        className="absolute right-0 bottom-0 w-[280px] sm:w-[420px] opacity-50 pointer-events-none"
      />
      <img
        src="/images/box1.png"
        className="absolute right-6 top-0 w-[240px] sm:w-[380px] opacity-50 pointer-events-none"
      />

      {/* Title + Price */}
      <div className="flex justify-between items-start relative z-10 flex-wrap gap-1">
        <h3
          className={`text-[18px] sm:text-[20px] font-bold ${
            isFree ? "text-[#4B4B4B]" : "text-[#D3322A]"
          }`}
        >
          {title}
        </h3>

        <p
          className={`font-bold text-[20px] sm:text-[22px] whitespace-nowrap ${
            isFree ? "text-[#4B4B4B]" : "text-[#D3322A]"
          }`}
        >
          {price}
          {masa && (
            <span className="text-[12px] sm:text-[14px] text-[#888] ml-1 font-normal">
              {masa}
            </span>
          )}
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-[13px] sm:text-[14px] text-[#666] mt-1 relative z-10">
        {subtitle}
      </p>

      {/* Features */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 
        text-[13px] sm:text-[14px] text-[#333] mt-6 relative z-10 leading-relaxed"
      >
        <div className="flex flex-col gap-3">
          {featuresLeft.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <FaRegCircleCheck className="text-[#3F3F3F] w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {featuresRight.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <FaRegCircleCheck className="text-[#3F3F3F] w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-10 sm:mt-0 sm:absolute sm:bottom-6 sm:right-6">
        <button
          onClick={handleClick}
          className={`w-full sm:w-auto
            px-8 sm:px-12 py-3 rounded-full
            text-[12px] font-semibold shadow-sm
            ${
              isFree
                ? "bg-[#B8B8B8] text-white cursor-default"
                : "bg-gradient-to-b from-[#FBB040] to-[#D23027] text-white hover:opacity-90"
            }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
