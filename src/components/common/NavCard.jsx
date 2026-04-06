import React from "react";
import { Icon } from "@iconify/react";

export default function NavCard({ icon, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer p-[2px] rounded-xl  
        bg-gradient-to-r from-[#E45E14] to-[#CA2323]
        transition-transform duration-800 ease-in-out 
        origin-top-left hover:scale-[1.05] 
        hover:shadow-[0_6px_16px_rgba(226,73,35,0.15)]
      "
    >
      <div className="group flex items-center gap-3 bg-white hover:bg-gradient-to-b from-[#FEF6F2] to-[#FFEAEB] rounded-[10px] w-[175px] px-4 py-3 shadow-md transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-center p-2 rounded-full bg-gradient-to-b from-[#FEF6F2] to-[#FFEAEB] transition-all duration-300 ease-in-out group-hover:from-white group-hover:to-white">
          <Icon
            icon={icon}
            className="w-6 h-6 text-primary-orange group-hover:text-primary-red transition-all duration-300 ease-in-out"
          />
        </div>

        <h3 className="font-semibold text-[15px] leading-none text-[#000405]">
          {title}
        </h3>
      </div>
    </div>
  );
}
