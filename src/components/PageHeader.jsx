import React from "react";

export default function PageHeader({
  title,
  subtitle,
  stats = [],
  code,
  backgroundImage,
}) {
  return (
    <div
      className="relative inter w-full h-40 rounded-xl overflow-hidden flex px-6 py-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex flex-col justify-between w-full text-white">

        <div>
          <h1 className="text-[23px] font-semibold">{title}</h1>
          <p className="text-[13px] font-regular">{subtitle}</p>
        </div>

        <div className="flex justify-between items-center mt-3">

          <div className="flex gap-2 flex-wrap">
            {stats.map((item, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-white/20 border border-white/70 backdrop-blur px-3 py-1 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
