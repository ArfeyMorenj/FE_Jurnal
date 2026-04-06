import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  className = "",
  type = "button",
  loading = false,
  disabled = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  to, 
  ...rest
}) => {
  const Comp = to ? Link : "button";

  return (
    <Comp
      type={to ? undefined : type}
      to={to}
      disabled={loading || disabled}
      className={`
        px-4 py-2 rounded font-medium transition
        inline-flex items-center justify-center gap-2 cursor-pointer
        ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          {loadingText || children}
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </Comp>
  );
};

export default Button;