import React, { useRef } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import clsx from "clsx";

export default function ColorPicker({
  color,
  setColor,
  label,
  styleLabel,
  name,
  required,
  error,
}) {
  const colorInputRef = useRef(null);

  const handleInputClick = () => {
    colorInputRef.current.click();
  };

  return (
    <div className="relative w-full">
        {label && (
        <label
          htmlFor={name}
          className={`block inter text-[13px] font-regular text-black mb-1 ${styleLabel}`}
        >
          {label} {required && <span className="text-primary-orange">*</span>}
        </label>
      )}
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border border-[#dfdfdf]"
          style={{ backgroundColor: color || '#f3f4f6' }}
        ></div>

        <input
          type="text"
          value={color || ""}
          onClick={handleInputClick}
          readOnly
          placeholder="Pilih warna"
          className={clsx(
            "w-full pl-10 pr-8 py-2 rounded-[10px] border border-[#EBF1F6] cursor-pointer text-sm placeholder:text-xs placeholder:text-[#8B8B8B]/70 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange",
            error && "border-red-500"
          )}
        />
      </div>

      <input
        type="color"
        ref={colorInputRef}
        value={color || "#000000"}
        onChange={(e) => setColor(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {error}
        </p>
      )}
    </div>
  );
}
