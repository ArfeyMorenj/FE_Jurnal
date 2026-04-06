import { useState } from "react";
import { IoEyeOff, IoEye, IoAlertCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { RxCross2 } from "react-icons/rx";

const InputField = ({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  onBlur, // Added onBlur support
  name,
  placeholder,
  error,
  styleInput,
  styleLabel,
  styleButton,
  inputStyle,
  readonly = false,
  note,
  onRemove, 
  showRemove = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={clsx("mb-4 relative", inputStyle)}>
      {label && (
        <label
          htmlFor={name}
          className={`block inter text-[13px] font-regular text-black mb-1 ${styleLabel}`}
        >
          {label} {required && <span className="text-primary-orange">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur} // Added onBlur handler
          placeholder={placeholder}
          readOnly={readonly}
          className={`w-full rounded-[10px] border border-[#EBF1F6] px-3 py-2 text-sm placeholder:text-xs placeholder:text-[#8B8B8B]/70 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange ${
            type === "password" ? "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden" : ""
          } ${styleInput} ${error ? "border-red-500" : ""}`}
        />

        {type === "password" && (
          <button
            type="button"
            className={`absolute right-3 top-2.5 text-gray-500 ${styleButton}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        )}

        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute right-3 top-2 p-1 rounded-full bg-[#DE1B1B] text-white transform transition-transform hover:scale-105 hover:bg-red-600"
          >
            <RxCross2 size={12} />
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {error}
        </p>
      )}
      {note && (
        <p className="inter text-[10px] text-[#8B8B8B]/50 mt-1 ml-3">{note}</p>
      )}
    </div>
  );
};

export default InputField;