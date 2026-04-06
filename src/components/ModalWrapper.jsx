import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./common/Button";
import { Icon as IconifyIcon } from "@iconify/react";

export default function ModalWrapper({
  isOpen,
  onClose,
  icon,
  iconBg = "#E45E14",
  title,
  description,
  children,
  confirmText = "Simpan",
  cancelText = "Batal",
  confirmColor = "bg-[#E45E14]",
  cancelColor = "bg-[#A0A0A0]",
  onConfirm,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[20px] w-full max-w-2xs md:max-w-3xl p-7 relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
            >
              <IoClose size={22} />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-[50px] h-[50px] rounded-[10px] flex items-center justify-center"
                style={{ backgroundColor: iconBg }}
              >
                {typeof icon === "string" ? (
                  <IconifyIcon icon={icon} className="text-white text-[30px]" />
                ) : (
                  <div className="text-white text-[30px]">{icon}</div>
                )}
              </div>
              <div>
                <h2 className="inter text-sm md:text-[17px] font-semibold text-black mb-1">
                  {title}
                </h2>
                {description && (
                  <p className="inter text-[10px] md:text-[13px] font-light text-black/50">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <hr className="border-[#D9D9D9]/80 mb-6" />

            <div className="mb-6">{children}</div>

            <div className="flex justify-end gap-3">
              <Button
                className={`${cancelColor} text-white font-bold text-[13px] px-8 py-2 rounded-[8px] transform transition-transform hover:scale-102`}
                onClick={onClose}
              >
                {cancelText}
              </Button>
              <Button
                className={`${confirmColor} text-white font-bold text-[13px] px-8 py-2 rounded-[8px] transform transition-transform hover:scale-102`}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}