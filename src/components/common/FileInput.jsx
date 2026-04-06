import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IoAlertCircleOutline, IoClose } from "react-icons/io5";

const FileInput = ({
  label,
  name,
  required = false,
  accept = "image/*",
  onChange,
  className,
  labelClassName,
  error,
  value,
  showPreview = true,
  note,
}) => {
  const [preview, setPreview] = useState(value || null);
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

    if (!validTypes.includes(file.type)) {
      const msg = "Format gambar tidak sesuai. Hanya PNG, JPG, atau JPEG.";
      setLocalError(msg);
      setPreview(null);

      e.target.value = "";
      onChange &&
        onChange({
          target: { name, value: null, error: msg },
        });
      return; 
    }

    if (file.size > 2 * 1024 * 1024) {
      const msg = "Ukuran gambar maksimal 2MB.";
      setLocalError(msg);
      setPreview(null);

      e.target.value = "";
      onChange &&
        onChange({
          target: { name, value: null, error: msg },
        });
      return;
    }

    setLocalError("");
    setPreview(URL.createObjectURL(file));
    onChange &&
      onChange({
        target: { name, value: file, error: "" },
      });
  };

  const handleRemoveImage = () => {
    setPreview(null);
    const fileInput = document.getElementById(name);
    if (fileInput) fileInput.value = "";
    setLocalError("");
    onChange &&
      onChange({
        target: { name, value: null, error: "" },
      });
  };

  return (
    <div className={clsx("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block inter text-[13px] font-regular text-black mb-1",
            labelClassName
          )}
        >
          {label} {required && <span className="text-primary-red">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={clsx(
          "block w-full text-sm text-gray-700 border border-[#EBF1F6] rounded-lg cursor-pointer bg-white",
          "focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange",
          "file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-light file:bg-[#EBF1F6] file:text-[#8B8B8B] hover:file:opacity-90"
        )}
      />

      {showPreview && preview && (
        <div className="mt-3 w-full flex justify-start">
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-36 h-24 object-cover rounded-lg border border-gray-200 transition-transform duration-200 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <IoClose size={14} />
            </button>
          </div>
        </div>
      )}

      {(localError || error) && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {localError || error}
        </p>
      )}

      {note && (
        <p className="inter text-[10px] text-[#8B8B8B]/50 mt-1 ml-3">{note}</p>
      )}
    </div>
  );
};

export default FileInput;
