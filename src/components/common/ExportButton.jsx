import { Icon } from "@iconify/react";

export default function ExportButtons() {
  return (
    <div className="flex items-center gap-3 bg-[#F2F2F7] border border-[#D9D9D9] rounded-[10px] p-2 shadow-sm">
      
      <button className="w-5 h-5 flex items-center justify-center text-[#818181] hover:bg-gray-200 rounded-md transition">
        <Icon icon="material-symbols:upload-rounded" width="22"  />
      </button>

      <button className=" flex items-center justify-center text-white rounded-md transition">
        <Icon icon="icon-park-solid:file-excel" width="22" color="#1D9375" />
      </button>

      <button className="w-5 h-5 flex items-center justify-center text-white rounded-md transition">
        <Icon icon="teenyicons:csv-solid" width="20" color="#1F51D2" />
      </button>

      <button className="w-5 h-5 flex items-center justify-center text-white rounded-md transition">
        <Icon icon="teenyicons:pdf-solid" width="20" color="#D21F28"/>
      </button>
    </div>
  );
}
