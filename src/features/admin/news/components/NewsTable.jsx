import { Trash2 } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import { FaEye } from "react-icons/fa6";
import clsx from "clsx";
import ActionButton from "../../../../components/common/ActionButton";

export default function NewsTable({ data = [], onEdit, onDelete, onView, startIndex = 0 }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[900px] border-collapse text-sm md:text-base rounded-lg">
        <thead>
          <tr className="bg-[#AA494E] inter font-semibold text-[13px] text-white text-left">
            <th className="py-3 px-4 text-center">No</th>
            <th className="py-3 px-4">Judul Berita</th>
            <th className="py-3 px-4">Kategori</th>
            <th className="py-3 px-4">Dilihat Sebanyak</th>
            <th className="py-3 px-4">Tanggal Upload</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 transition border border-[#D9D9D9] text-[#606060] inter text-[13px]"
              >
                <td className="py-5 px-4 text-center font-light">{startIndex + index + 1}</td>
                <td className="py-5 px-4 font-light">{item.title}</td>
                <td className="py-5 px-4 font-semibold">
                  {item.category}
                </td>
                <td className="py-5 px-4 font-light">
                  {item.views}
                </td>
                <td className="py-5 px-4 font-light">
                  {item.uploadDate}
                </td>
                <td
                  className={clsx(
                    "py-5 px-4 font-semibold",
                    item.status === "Dipublikasikan"
                      ? "text-[#1D9375]"
                      : "text-primary-orange"
                  )}
                >
                  {item.status}
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      onClick={() => onView?.(item)}
                      icon={FaEye}
                      color="#007BFF"
                      hoverBg="#E7F1FF"
                      size={17}
                    />
                    <ActionButton
                      onClick={() => onEdit?.(item)}
                      icon={HiPencil}
                      color="#F0A206"
                      hoverBg="#FFF8E1"
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
              <td colSpan="7" className="py-6 text-center text-gray-500 italic">
                Belum ada berita yang ditambahkan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
