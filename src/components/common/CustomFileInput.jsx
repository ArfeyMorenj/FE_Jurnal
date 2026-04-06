import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { IoAlertCircleOutline } from "react-icons/io5";

const CustomFileInput = ({
  label = "Gambar",
  name = "image",
  value,
  error,
  onChange,
  previewSize = { w: 160, h: 80 },
}) => {
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      setPreview(URL.createObjectURL(value));
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      const msg = "Format gambar harus PNG, JPG, atau JPEG.";
      setLocalError(msg);
      setPreview(null);
      onChange({ target: { name, value: null, error: msg } });
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      const msg = "Ukuran gambar maksimal 2MB.";
      setLocalError(msg);
      setPreview(null);
      onChange({ target: { name, value: null, error: msg } });
      e.target.value = "";
      return;
    }

    setLocalError("");
    setPreview(URL.createObjectURL(file));

    onChange({ target: { name, value: file, error: "" } });
  };

  const handleRemove = () => {
    setPreview(null);
    setLocalError("");
    onChange({ target: { name, value: null, error: "" } });
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold inter text-[#000405] mb-4 flex items-center gap-2">
        <Icon icon="material-symbols:image" width="20" className="text-primary-red" />
        <span>{label}</span>
      </label>

      <div
        className="relative rounded-lg bg-[#F9FAFB] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
        style={{ width: previewSize.w, height: previewSize.h }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-lg">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="8"
            fill="none"
            stroke="rgba(160,160,160,.7)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>

        {preview ? (
          <>
            <img src={preview} className="w-full h-full object-cover rounded-lg" />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-[#DE1B1B] text-white p-1.5 rounded-full hover:scale-110"
            >
              <Icon icon="streamline:delete-1-solid" width="10" />
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center text-[#8B8B8B] text-sm cursor-pointer z-10">
            <img src="/images/photo.png" className="w-[45px] h-[45px]" />
            <span className="text-[11px] font-medium inter">Unggah Gambar</span>

            <input
              type="file"
              name={name}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {(localError || error) && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {localError || error}
        </p>
      )}
    </div>
  );
};

export default CustomFileInput;
