import React from "react";
import { highlightMiJurnal } from "../../../utils/highlightMiJurnal";
import { Icon } from "@iconify/react";
import useHighlight from "../../admin/beranda/controller/useHighlight";

export default function SorotanSection() {
  const { highlight, points } = useHighlight(); 
  const main = highlight;

  return (
    <section className="mx-8 md:mx-16 bg-[#FFF3E8] rounded-[20px] py-4 md:py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-4">
          {highlightMiJurnal(main?.title || "Sorotan Aplikasi MiJurnal")}
        </h2>
        <p className="text-[#1F1C1470] text-base md:text-2xl max-w-5xl mx-auto mb-3 md:mb-6">
          {main?.description ||
            "MiJurnal menghadirkan berbagai aplikasi serbaguna untuk mendukung aktivitas belajar, bekerja, hingga pengelolaan sehari-hari dalam satu tempat."}
        </p>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-5 overflow-x-auto sm:overflow-visible no-scrollbar py-4">
          {points.map((item) => (
            <div
              key={item.id}
              className="min-w-[200px] sm:min-w-0 flex items-center bg-white rounded-xl shadow px-6 py-4 hover:shadow-lg transition gap-3"
            >
              <div className="w-15 h-15 flex items-center justify-center rounded-[20px]  overflow-hidden bg-white">
                {item.icon?.includes("http") ? (
                  <img
                    src={item.icon}
                    alt={item.point_title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon={item.icon} className="w-8 h-8 text-[#FFA152]" />
                )}
              </div>
              <h3 className="text-base md:text-2xl font-semibold text-[#1F1C14]">
                {item.point_title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
