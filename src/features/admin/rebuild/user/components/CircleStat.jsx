import React from "react";
import { getStatConfig } from "../config/statsConfig.js";

export default function CircleStat({ type, value, label }) {
  const { color, text, label: defaultLabel } = getStatConfig(type);

  const displayLabel = label || defaultLabel;

  return (
    <div className="flex flex-col items-center text-center w-28">
      <div
        className="w-24 h-24 rounded-full flex justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <p className="text-2xl font-bold" style={{ color: text }}>
          {value || 0}
        </p>
      </div>
      <p className="text-xs mt-2 leading-tight text-[#464646]">
        {displayLabel}
      </p>
    </div>
  );
}