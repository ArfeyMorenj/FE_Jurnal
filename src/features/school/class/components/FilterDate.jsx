import { useState } from "react";
import InputField from "../../../../components/common/InputField";

export const FilterDate = ({
  isOpen,
  onClose,
  onApplyFilter,
  onResetFilter,
  initialFilters = {},
}) => {
  const defaultFilters = {
    created_from: "",
    created_to: "",
  };

  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...initialFilters,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    if (onResetFilter) onResetFilter(defaultFilters);
  };

  const handleApply = () => {
    if (onApplyFilter) onApplyFilter(filters);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    setFilters({ ...defaultFilters, ...initialFilters });
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={handleCancel}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-xl p-6 animate-fadeIn">
        
        <h2 className="text-xl font-bold text-black">
          Filter Data
        </h2>
        <hr className="border-t border-[#C1C7CD] my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Tanggal Mulai Dibuat"
            name="created_from"
            type="date"
            value={filters.created_from}
            onChange={handleInputChange}
          />

          <InputField
            label="Tanggal Terakhir Dibuat"
            name="created_to"
            type="date"
            value={filters.created_to}
            onChange={handleInputChange}
          />
        </div>

        <hr className="border-t border-[#C1C7CD] my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3  pt-6 mt-6">
          
          <button
            className="px-4 py-1 text-sm text-[#8B8B8B] border border-[#8B8B8B] rounded-[6px] hover:bg-[#F6F6F6]"
            onClick={handleReset}
          >
            Reset
          </button>

          <div className="flex gap-3">
            <button
              className="px-4 py-1 text-sm text-[#8B8B8B] border border-[#8b8b8b] rounded-[6px] hover:bg-[#F6F6F6]"
              onClick={handleCancel}
            >
              Batal
            </button>

            <button
              className="px-4 py-1 text-sm rounded-[6px] bg-[#AA494E] text-white hover:bg-[#933d41]"
              onClick={handleApply}
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
