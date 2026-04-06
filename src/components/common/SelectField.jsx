import { IoAlertCircleOutline } from "react-icons/io5";
import clsx from "clsx";

const SelectField = ({
  label,
  required = false,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Pilih opsi",
  error,
  styleInput,
  styleLabel,
  inputStyle,
  readonly = false,
  note,
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={readonly}
          className={clsx(
            "w-full bg-white border border-[#EBF1F6] rounded-[10px] px-4 py-3 pr-10 inter text-xs text-[#00040580] font-light appearance-none focus:outline-none focus:ring-2 focus:ring-primary-orange/10 focus:border-primary-orange cursor-pointer",
            styleInput,
            error && "border-red-500"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8B8B]/70 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <IoAlertCircleOutline /> {error}
        </p>
      )}

      {note && (
        <p className="inter text-[10px] text-[#8B8B8B]/50 mt-1">{note}</p>
      )}
    </div>
  );
};

export default SelectField;
