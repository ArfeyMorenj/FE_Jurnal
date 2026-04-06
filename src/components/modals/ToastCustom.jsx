import React, { useEffect, useState } from "react";
import { XCircle, AlertTriangle, CheckCircle, X } from "lucide-react";

const typeStyles = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50 border-green-200",
    iconBg: "bg-green-100 text-green-600",
    progress: "bg-green-600",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-white border-yellow-200",
    iconBg: "bg-yellow-100 text-yellow-600",
    progress: "bg-yellow-600",
  },
  danger: {
    icon: XCircle,
    bg: "bg-red-50 border-red-200",
    iconBg: "bg-red-100 text-red-600",
    progress: "bg-red-600",
  },
};

export default function ToastCustom({
  type = "success",
  title,
  description,
  duration = 5000,
  onClose,
  position = "top-right",
}) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          handleClose();
          return 0;
        }
        return prev - 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  const styles = typeStyles[type] || typeStyles.success;
  const Icon = styles.icon;

  const pos = {
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "top-center": "top-5 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-5 left-1/2 -translate-x-1/2",
  }[position];

  return (
   <div
      className={`fixed z-[9999] transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      } ${pos}`}
    >
      <div
        className={`
          flex items-start gap-3 rounded-xl border shadow-lg transition-all duration-300 
          ${styles.bg} 
          w-[70vw] max-w-[340px] p-3 sm:p-4
        `}
      >
        <div
          className={`flex items-center justify-center rounded-full ${styles.iconBg} 
            w-8 h-8 sm:w-10 sm:h-10
          `}
        >
          <Icon className="text-sm md:text-xl" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-gray-800 text-xs sm:text-sm">
            {title}
          </p>
          {description && (
            <p className="text-gray-600 text-[11px] sm:text-sm mt-0.5 sm:mt-1">
              {description}
            </p>
          )}

          <div className="w-full h-1 bg-gray-200 rounded mt-2 overflow-hidden">
            <div
              className={`h-full ${styles.progress} transition-all duration-100`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition mt-1 sm:mt-0"
        >
          <X  className="text-xs md:text-base" />
        </button>
      </div>
    </div>
  );
}
