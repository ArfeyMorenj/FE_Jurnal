import React from 'react';

const JourneyCard = ({ year, description }) => {
  return (
    <div
      className="
        w-full min-w-[350px] min-h-[200px]
        rounded-2xl shadow-sm 
        p-4 sm:p-5 
        transition-all duration-300 
        hover:scale-105 hover:shadow-lg
        cursor-pointer
      "
    >
      <h1 className="text-[32px] sm:text-[40px] font-bold bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text text-transparent">
        {year}
      </h1>

      <p className="text-black/60 text-[14px] sm:text-[16px] mt-3 sm:mt-4">
        {description}
      </p>
    </div>
  );
};

export default JourneyCard;
