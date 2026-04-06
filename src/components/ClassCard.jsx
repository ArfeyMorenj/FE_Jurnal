import React, { useState, useEffect } from "react";

export default function ClassCard({
  image,
  kodeKelas,
  title,
  teacher,
  siswa,
  tugas,
  jurnal,
  onDetail,
}) {
  // Jika image kosong atau adalah default.jpg, gunakan class.png sebagai default
  const normalizeImage = (img) => {
    if (!img || img === "/images/default.jpg" || img.includes("/images/default.jpg")) {
      return "/images/class.png";
    }
    return img;
  };

  const [imgSrc, setImgSrc] = useState(() => normalizeImage(image));

  useEffect(() => {
    setImgSrc(normalizeImage(image));
  }, [image]);

  const handleImageError = () => {
    setImgSrc("/images/class.png");
  };

  return (
    <div className="bg-white rounded-[15px] shadow-[0_4px_18px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden max-w-md">

      <div className="relative p-4 ">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-44 object-cover rounded-[10px]"
          onError={handleImageError}
        />

        <div className="absolute inset-0 m-4 rounded-[10px] bg-black/35 backdrop-blur-[1px]"></div>
      </div>

      <div className="px-4">
        <div className="border-t border-[#D9D9D9]"></div>
      </div>


      <div className="px-4 py-3 inter">
        <h2 className="text-xl font-semibold text-[#464646]">{title}</h2>
        <p className="text-xs text-[#46464670] mt-0.5">Oleh: {teacher}</p>
      </div>

      <div className="inter px-4 pb-4 flex justify-center gap-4 text-center mt-1">

        <div>
          <div className="relative rounded-[5px] bg-[#FFEAEB] py-2 w-[81px] h-[71px] overflow-hidden">
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2
              w-[59px] h-[59px] rounded-full bg-white/30
              [box-shadow:0_4px_10px_rgba(0,0,0,0.04),inset_0_4px_10px_rgba(0,0,0,0.04)]"
            />
            <p className="text-xl font-semibold text-primary-red relative z-10">{siswa}</p>
            <p className="text-sm text-primary-red font-medium relative z-10 mt-2">Siswa</p>
          </div>
        </div>

        <div>
          <div className="relative rounded-[5px] bg-orange-50 py-2 w-[81px] h-[71px] overflow-hidden">
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2
              w-[59px] h-[59px] rounded-full bg-white/30
              [box-shadow:0_4px_10px_rgba(0,0,0,0.04),inset_0_4px_10px_rgba(0,0,0,0.04)]"
            />
            <p className="text-xl font-semibold text-orange-500 relative z-10">{tugas}</p>
            <p className="text-sm text-orange-500 font-medium relative z-10 mt-2">Tugas</p>
          </div>
        </div>

        <div>
          <div className="relative rounded-[5px] bg-green-50 py-2 w-[81px] h-[71px] overflow-hidden">
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2
              w-[59px] h-[59px] rounded-full bg-white/30
              [box-shadow:0_4px_10px_rgba(0,0,0,0.04),inset_0_4px_10px_rgba(0,0,0,0.04)]"
            />
            <p className="text-xl font-semibold text-green-500 relative z-10">{jurnal}</p>
            <p className="text-sm text-green-500 font-medium relative z-10 mt-2">Jurnal</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={onDetail}
          className="w-full py-3 bg-primary-red text-white font-medium text-[13px] inter hover:bg-red-700 transition rounded-[8px]"
        >
          Detail
        </button>
      </div>

    </div>
  );
}
