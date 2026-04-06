import { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalFilter({ isOpen, onClose, filters, onApply, onReset }) {
  const ref = useRef(null);
  
  const [localFilters, setLocalFilters] = useState({
    status: "",
    package: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }

    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      status: "",
      package: "",
      start: "",
      end: "",
    };
    setLocalFilters(resetFilters);
    if (onReset) {
      onReset(resetFilters);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="
              bg-white rounded-xl shadow-lg 
              w-full max-w-lg md:max-w-2xl 
              p-4 md:p-6 relative max-h-[85vh] overflow-y-auto
            "
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Filter Data</h2>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="relative">
                  <select 
                    value={localFilters.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full border rounded-lg bg-white px-3 py-2 text-sm border-gray-300 appearance-none"
                  >
                    <option value="">Semua Status</option>
                    <option value="UNPAID">Belum Dibayar</option>
                    <option value="PAID">Sudah Dibayar</option>
                    <option value="EXPIRED">Kadaluarsa</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Tanggal Mulai Transaksi</label>
                  <input
                    type="date"
                    value={localFilters.start}
                    onChange={(e) => handleChange("start", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm border-gray-300"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Tanggal Terakhir Transaksi</label>
                  <input
                    type="date"
                    value={localFilters.end}
                    onChange={(e) => handleChange("end", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm hover:bg-gray-100 w-full sm:w-auto"
              >
                Reset
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm hover:bg-gray-100 w-full sm:w-auto"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={handleApply}
                  className="bg-[#AA494E] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#8c3d41] w-full sm:w-auto"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}