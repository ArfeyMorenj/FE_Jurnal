import ActionButton from "../../../../components/common/ActionButton";
import { Trash2 } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import { FaEye } from "react-icons/fa6";

export default function TestimonialTable({ data = [], onView, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[900px] border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-[#AA494E] inter font-semibold text-[13px] text-white text-left">
            <th className="py-3 px-4 text-center">Gambar</th>
            <th className="py-3 px-4">Nama User</th>
            <th className="py-3 px-4">Ulasan</th>
            <th className="py-3 px-4 text-center">Aplikasi</th>
            <th className="py-3 px-4 text-center">Rating</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 transition border border-[#EBF1F6]"
              >
                <td className="py-5 px-4 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[70px] h-[70px] rounded-[15px] object-cover mx-auto"
                  />
                </td>

                <td className="py-5 px-4 inter text-[13px] text-black whitespace-nowrap">
                  {item.name}
                </td>

                <td className="py-5 px-4 inter text-[13px] text-black whitespace-normal break-words max-w-[300px]">
                  {item.review.length > 100 ? item.review.slice(0,100) + "..." : item.review}
                </td>

                <td className="py-5 px-4 inter  text-[13px] text-black">
                  {item.app}
                </td>

                <td className="py-5 px-4 text-center min-w-[120px]">
                  {[...Array(item.rating)].map((_, i) => (
                    <IoMdStar key={i} size={17} className="inline text-[#FFAD33]" />
                  ))}
                </td>

                <td className="py-5 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      onClick={() => onView?.(item.id)}
                      icon={FaEye}
                      color="#2B71EB"
                      hoverBg="#E7F0FF"
                      size={17}
                    />
                    <ActionButton
                      onClick={() => onEdit?.(item.id)}
                      icon={HiPencil}
                      color="#F0A206"
                      hoverBg="#FFF8E7"
                      size={17}
                    />
                    <ActionButton
                      onClick={() => onDelete?.(item.id)}
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
              <td
                colSpan="6"
                className="py-6 text-center text-gray-500 italic"
              >
                Belum ada data testimonial.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
