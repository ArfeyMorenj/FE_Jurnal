import { useState, useEffect, useRef } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import clsx from "clsx";

const SearchInput = ({
  placeholder = "Cari...",
  value,
  onChange,
  onSearch,
  onClear,
  className,
  disabled = false,
  showClear = true,
  size = "md",
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const debounceRef = useRef(null);

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  useEffect(() => {
    if (!onSearchRef.current) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onSearchRef.current(internalValue);
    }, 1000);

    return () => clearTimeout(debounceRef.current);
  }, [internalValue]);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    onClear?.();
    onSearchRef.current?.("");
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const iconSizes = { sm: 14, md: 16, lg: 18 };

  return (
    <div className={clsx("relative", className)}>
      <IoSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={iconSizes[size]}
      />

      <input
        type="text"
        value={internalValue}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className={clsx(
          "w-full bg-white border border-[#EBF1F6] rounded-[10px] pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange",
          sizeClasses[size]
        )}
      />

      {showClear && internalValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <IoClose size={iconSizes[size]} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
