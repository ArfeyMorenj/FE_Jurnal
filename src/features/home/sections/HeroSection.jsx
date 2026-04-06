import React from "react";
import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import { FaCheck } from "react-icons/fa6";
import { useBenefitSection } from "../../admin/beranda/hooks/useBenefitSection";

export default function HeroSection() {
  const { benefits, formData, loading } = useBenefitSection();

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 items-center">
        
        <div className="relative flex justify-center md:justify-start">
          <img
            src="/images/backgrounds/bg1.png"
            alt="Background Shape"
            className="w-64 md:w-full relative z-0"
          />

          <img
            src="/images/phone4.png"
            alt="App Preview"
            className="w-60 md:w-156 absolute top-22 md:top-45 left-1/2 -translate-x-1/2 md:-translate-x-4 md:left-4 z-10 drop-shadow-xl"
          />
        </div>

        <div className="text-center md:text-left">

          <h1 className="text-xl md:text-4xl font-medium text-[#0F2137] leading-normal md:leading-[55px] tracking-[-1px] mb-4">
            {
              highlightMiJurnal(formData.deskripsi || "")
            }
          </h1>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto md:mx-0">

            {!loading &&
              benefits.map((b) => (
                <div key={b.id} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 md:h-6 md:w-6 h-5 rounded-full bg-gradient-to-b from-primary-red to-primary-orange">
                    <FaCheck className="text-white text-xs md:text-sm" />
                  </div>
                  <span className="text-[#0F2137] font-medium text-base md:text-[20px]">
                    {b.value}
                  </span>
                </div>
              ))}
          </div>

        </div>
      </div>
    </section>
  );
}
