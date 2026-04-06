import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import usersIcon from "/svg/users.svg";
import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import Button from "../../../components/common/Button";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { usePromotionSection } from "../../admin/beranda/hooks/usePromotionSection";

export default function InfoSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { formData } = usePromotionSection();

  return (
    <section className="relative bg-white py-16 my-8">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4 poppins tracking-[-1px]">
              {highlightMiJurnal(formData.judul_section || "")}
            </h1>

            <p className="text-[#6B6B6B] text-sm md:text-lg mb-6">
              {formData.subjudul_section || ""}
            </p>

            <div className="flex gap-4 mb-10">
              <Button
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/developer?id=Hummatech&hl=id",
                    "_blank"
                  )
                }
                className="bg-primary-red text-white px-6 py-3 rounded-lg shadow text-semibold inter hover:bg-red-700"
              >
                {formData.label_tombol || "Download Aplikasi"}
              </Button>
            </div>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute flex items-center justify-center mt-20">
              <div className="w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full border-[40px] md:border-[60px] bg-orange-500 border-red-600"></div>
            </div>

            <img
              src="/images/woman.png"
              alt="Wanita"
              className="relative mb-12 z-10 h-[300px] md:h-[600px]"
            />

            <div className="absolute top-24 left-0 md:left-2 bg-white shadow-lg rounded-sm p-2 md:p-3 text-xs md:text-sm flex items-center gap-2 z-20 animate-[float_3s_ease-in-out_infinite] min-w-[125px] md:min-w-[190px]">
              <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-primary-orange to-primary-red">
                <FaCheck className="text-xs md:text-xl text-white" />
              </div>
              <div className="inter flex flex-col">
                <p className="font-semibold text-[8px] md:text-xs">Got</p>
                <p className="font-bold text-sm md:text-xl">100+ Score</p>
              </div>
            </div>

            <div className="absolute top-16 md:top-20 right-0 bg-white shadow-lg rounded-sm px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm flex items-center gap-2 z-20 animate-[float_3.1s_ease-in-out_infinite]">
              <FaBookOpen className="text-lg md:text-4xl text-[#FE9802]" />
              <div className="flex flex-col inter">
                <p className="font-semibold text-sm md:text-xl">60+</p>
                <p className="text-[10px] md:text-sm text-[#414141]">
                  Mata Pelajaran
                </p>
              </div>
            </div>

            <div className="absolute bottom-20 md:bottom-30 left-0 bg-white shadow-lg rounded-sm px-4 py-1 md:px-6 md:py-2 text-xs md:text-sm flex items-center gap-2 md:gap-3 z-20 animate-[float_3.2s_ease-in-out_infinite] min-w-[130px] md:min-w-[170px]">
              <img src={usersIcon} alt="users" className="w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col inter text-[#414141]">
                <p className="font-bold text-sm md:text-lg">
                  {inView ? (
                <CountUp end={Number(formData.active_user || 0)} duration={2} />
              ) : (
                "0"
              )}
              +
                </p>
                <p className="text-[10px] md:text-sm">User Aktif</p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={ref}
          className="relative bg-white shadow-xl rounded-2xl z-20 flex flex-col md:flex-row text-center py-4 md:py-12 md:divide-x divide-y md:divide-y-0 divide-[#979797] -mt-12 md:-mt-18"
        >
          <div className="flex-1 px-6 py-4">
            <h2 className="text-6xl font-semibold text-[#FF6652] poppins">
              {inView ? (
                <CountUp end={Number(formData.active_user || 0)} duration={2} />
              ) : (
                "0"
              )}
              +
            </h2>
            <p className="text-base text-[#6B6B6B] inter">Pengguna Aktif</p>
          </div>

          <div className="flex-1 px-6 py-4">
            <h2 className="text-6xl font-semibold text-[#FF6652] poppins">
              {inView ? (
                <CountUp end={Number(formData.app_user || 0)} duration={2} />
              ) : (
                "0"
              )}
              +
            </h2>
            <p className="text-base text-[#6B6B6B] inter">Pengguna Aplikasi</p>
          </div>

          <div className="flex-1 px-6 py-4">
            <h2 className="text-6xl font-semibold text-[#FF6652] poppins">
              {inView ? (
                <CountUp end={Number(formData.app_rate || 0)} duration={2} />
              ) : (
                "0"
              )}
              +
            </h2>
            <p className="text-base text-[#6B6B6B] inter">Rating Aplikasi</p>
          </div>
        </div>
      </div>
    </section>
  );
}