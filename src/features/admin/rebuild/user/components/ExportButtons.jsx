import { Icon } from "@iconify/react";

export default function ExportButtons({ onExportExcel, onExportPDF, exportPdfLoading, exportExcelLoading }) {

  return (
    <div className="flex items-center gap-2 bg-[#F2F2F7] border border-[#D9D9D9] rounded-2xl p-2 shadow-sm">
      
      <button
        className="w-5 h-5 flex items-center justify-center text-[#818181] hover:bg-gray-200 rounded-md transition"
        onClick={() => alert("Upload feature coming soon")}
        title="Upload"
      >
        <Icon icon="material-symbols:upload-rounded" width="22" />
      </button>

      <button
        className="flex items-center justify-center rounded-md transition hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onExportExcel}
        disabled={exportExcelLoading}
        title="Export Excel"
      >
        {exportExcelLoading ? (
          <span className="text-xs font-medium text-[#1D9375]">Loading...</span>
        ) : (
          <Icon icon="icon-park-solid:file-excel" width="22" color="#1D9375" />
        )}
      </button>

      <button
        className="flex items-center justify-center rounded-md transition hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onExportPDF}
        disabled={exportPdfLoading}
        title="Export PDF"
      >
        {exportPdfLoading ? (
          <span className="text-xs font-medium text-[#D21F28]">Loading...</span>
        ) : (
          <Icon icon="teenyicons:pdf-solid" width="20" color="#D21F28"/>
        )}
      </button>

    </div>
  );
}