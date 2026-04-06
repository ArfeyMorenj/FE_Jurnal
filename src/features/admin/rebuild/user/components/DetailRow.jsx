import React from "react";

export default function DetailRow({ label, value, span }) {
  return (
    <div className={`${span ? "md:col-span-2" : ""} flex flex-col gap-0 mb-3`}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}