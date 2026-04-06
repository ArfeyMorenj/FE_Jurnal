import { IoAlertCircleOutline } from "react-icons/io5";
import clsx from "clsx";

const TextareaField = ({
  label,
  required = false,
  value,
  onChange,
  name,
  placeholder,
  error,
  styleInput,
  styleLabel,
  inputStyle,
  readonly = false,
  note, 
  rows = 4, 
}) => {
  return (
    <div className={clsx("mb-4", inputStyle)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block inter text-[13px] font-regular text-black mb-1",
            styleLabel
          )}
        >
          {label} {required && <span className="text-primary-orange">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readonly}
          rows={rows}
          className={clsx(
            "w-full border border-[#EBF1F6] rounded-[10px] px-3 py-2 text-sm text-black placeholder:text-xs placeholder:text-[#8B8B8B]/70 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange resize-y",
            styleInput,
            error && "border-red-500"
          )}
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {error}
        </p>
      )}

      {note && (
        <p className="inter text-[10px] text-[#8B8B8B]/50 ml-3">{note}</p>
      )}
    </div>
  );
};

export default TextareaField;
