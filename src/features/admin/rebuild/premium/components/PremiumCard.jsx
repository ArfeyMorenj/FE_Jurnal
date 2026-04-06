import { FaRegCircleCheck } from "react-icons/fa6";
import { Icon } from "@iconify/react";

export default function PremiumCard({
  title,
  subtitle,      
  description,     
  price,
  features,
}) {
  return (
    <div className="relative inter bg-white rounded-3xl p-10 overflow-hidden">

      <img
        src="/images/box2.png"
        className="absolute bottom-0 right-0 w-[50%] md:w-[464px] opacity-60 pointer-events-none select-none"
      />
      <img
        src="/images/box1.png"
        className="absolute top-0 right-16 w-[50%] md:w-[426px] opacity-60 pointer-events-none select-none"
      />

      <label className="block text-lg font-bold mb-6 text-[#464646] flex items-center gap-2">
        <Icon icon="fluent:premium-12-filled" width="20" className="text-primary-red" />
        <span>{title}</span>
      </label>
      <hr className="border-[#D9D9D9]/80 my-6" />

      <div className="px-12">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 relative z-10 gap-2">
          <h3 className="font-semibold text-lg bg-gradient-to-t from-primary-red to-primary-orange bg-clip-text text-transparent">
            {subtitle}
          </h3>

          <p className="font-semibold text-xl bg-gradient-to-b from-primary-orange to-primary-red bg-clip-text text-transparent sm:text-right">
            {price}
            <span className="text-sm font-medium text-[#818181]">/bulan</span>
          </p>
        </div>

        <p className="text-[#464646] mb-6 text-base">{description}</p>

        <p className="text-[#464646] mb-6 text-base">Apa yang bisa anda dapatkan?</p>

        {features.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mb-8 relative z-10 mt-2 max-w-lg list-none">
            {features.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-base text-[#464646]">
                <FaRegCircleCheck className="text-[#4A4D4D] w-5 h-5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <button className="bg-gradient-to-b from-primary-orange to-primary-red px-6 py-2 rounded-[20px] text-white text-[10px] font-semibold shadow-sm absolute right-10 bottom-10 active:scale-95 transition cursor-pointer">
          Berlangganan Sekarang
        </button>
      </div>
    </div>
  );
}