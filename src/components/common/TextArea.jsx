import React from 'react';
import clsx from 'clsx';

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Masukkan deskripsi...",
  required = false,
  error,
  className,
  labelClassName,
  rows = 4,
  disabled = false,
  readonly = false,
}) => {
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
          {label} {required && <span className="text-primary-orange">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readonly}
        className={clsx(
          "w-full rounded-[10px] border border-[#EBF1F6] px-3 py-2 text-sm placeholder:text-[#8B8B8B]/70 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange resize-vertical",
          {
            "border-red-500": error,
            "bg-gray-100 cursor-not-allowed": disabled,
            "bg-gray-50": readonly,
          }
        )}
      />

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
