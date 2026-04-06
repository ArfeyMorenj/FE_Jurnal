import { Trash2 } from "lucide-react";
import { RiExchangeLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import ActionButton from "../../../../components/common/ActionButton";
import { getImageUrl } from "../../../../utils/image";

export default function ApplicationTable({ data, onView, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[800px] rounded-lg">
        <thead className="bg-[#AA494E] text-white text-left font-semibold inter text-[13px]">
          <tr>
            <th className="px-4 py-3 text-center">Gambar</th>
            <th className="px-4 py-3">Nama Aplikasi</th>
            <th className="px-4 py-3">Deskripsi Singkat</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-[#D9D9D9]">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition border border-[#D9D9D9]">
              <td className="px-6 py-5">
                <div className="w-20 h-20 border border-[#8B8B8B70] rounded-lg flex items-center justify-center overflow-hidden bg-white">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </td>

              <td className="px-4 py-5 text-xs inter font-regular text-[#000405] whitespace-nowrap">
                {item.name}
              </td>

              <td className="px-4 py-5 text-xs inter font-regular text-[#000405]">
                {item.description}
              </td>

              <td className="px-4 py-5 text-center">
                <div className="flex justify-center gap-2">                  
                  <ActionButton
                    onClick={() => onView(item.id)}
                    icon={FaEye}
                    color="#0059FF" 
                    hoverBg="#eef4ffff"    
                    size={17}            
                  />
                  <ActionButton
                    onClick={() => onEdit?.(item)}
                    icon={RiExchangeLine}
                    color="#F0A206"     
                    hoverBg="#fffaf0ff"
                    size={17}         
                  />
                  <ActionButton
                    onClick={() => onDelete?.(item)}
                    icon={Trash2}
                    color="#AA494E"     
                    hoverBg="#FFF1F1"    
                    size={17}            
                  />              
                </div>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-sm text-gray-400 italic"
              >
                Belum ada data aplikasi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
