import ActionButton from "../../../../components/common/ActionButton";
import { Trash2 } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import { FaEye } from "react-icons/fa6";
import { getImageUrl } from "../../../../utils/image";

export default function HeroTable({ data = [], onEdit, onDelete, onView, loading }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[800px] border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-[#AA494E] inter font-semibold text-[13px] text-white text-left">
            <th className="py-3 px-4 text-center">Gambar</th>
            <th className="py-3 px-4">Headline</th>
            <th className="py-3 px-4 max-w-2xs">Subheadline</th>
            <th className="py-3 px-4">Tombol CTA</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-primary-red rounded-full animate-spin mb-3" />
                  <span className="text-sm">Memuat data hero...</span>
                </div>
              </td>
            </tr>
          ) : safeData.length > 0 ? (
            safeData.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 transition border border-[#EBF1F6]"
              >
                <td className="px-4 py-5 flex items-center justify-center">
                  <div className="w-20 h-20 border border-[#8B8B8B70] rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title || "Hero Image"}
                      className="w-full h-full object-contain transition-opacity duration-300"
                      onError={(e) => (e.target.src = "/images/default.jpg")}
                    />
                  </div>
                </td>

                <td className="py-5 px-4 max-w-[200px] text-[13px] whitespace-normal break-words">
                  {item.title || "-"}
                </td>

                <td className="py-5 px-4 max-w-2xs text-[13px] font-medium whitespace-normal break-words">
                  {item.description
                    ? item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description
                    : "-"}
                </td>

                <td className="py-5 px-4 max-w-2xs text-[13px] font-medium whitespace-normal break-words">
                  {item.button_link ? (
                    <a
                      href={item.button_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {item.button_link}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="py-5 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      onClick={() => onView?.(item)}
                      icon={FaEye}
                      color="#0059FF"
                      hoverBg="#eef4ffff"
                      size={17}
                    />
                    <ActionButton
                      onClick={() => onEdit?.(item)}
                      icon={HiPencil}
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
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500 italic">
                Belum ada data Hero.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
