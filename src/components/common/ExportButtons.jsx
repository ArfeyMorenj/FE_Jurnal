import { Icon } from "@iconify/react";

export default function ExportButtons({ onExportExcel, onExportPDF, loading }) {
  
  return (
    <div className="flex items-center gap-2 bg-[#F2F2F7] border border-[#D9D9D9] rounded-2xl p-2 shadow-sm">
      
      <button
        className="w-5 h-5 flex items-center justify-center text-[#818181] hover:bg-gray-200 rounded-md transition cursor-pointer"
        onClick={() => alert("Upload feature coming soon")}
        title="Upload"
      >
        <Icon icon="material-symbols:upload-rounded" width="22" />
      </button>

      <button
        className="flex items-center justify-center rounded-md transition hover:opacity-80 cursor-pointer"
        onClick={onExportExcel}
        disabled={loading}
        title="Export Excel"
      >
        <Icon icon="icon-park-solid:file-excel" width="22" color="#1D9375" />
      </button>

      <button
        className="w-5 h-5 flex items-center justify-center rounded-md transition hover:opacity-80 cursor-pointer"
        onClick={onExportPDF}
        disabled={loading}
        title="Export PDF"
      >
        <Icon icon="teenyicons:pdf-solid" width="20" color="#D21F28"/>
      </button>
    </div>
  );
}