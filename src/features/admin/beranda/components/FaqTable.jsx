import ActionButton from "../../../../components/common/ActionButton";
import { Trash2 } from "lucide-react";
import { HiPencil } from "react-icons/hi2";

export default function FaqTable({ data = [], onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[800px] border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-[#AA494E] inter font-semibold text-[13px] text-white text-left">
            <th className="py-3 px-6 text-center">No</th>
            <th className="py-3 px-4 md:w-[25%]">Pertanyaan</th>
            <th className="py-3 px-4 md:w-[55%]">Jawaban</th>
            <th className="py-3 px-4 md:w-[15%] text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 transition border border-[#EBF1F6]"
              >
                <td className="py-5 px-4 text-center text-black whitespace-nowrap">{index + 1}</td>
                <td className="py-5 px-4 text-[13px] whitespace-normal break-words">
                  {item.question}
                </td>
                <td className="py-5 px-4 text-[13px] font-medium whitespace-normal break-words">
                  {item.answer}
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center justify-center gap-2">
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
              <td
                colSpan="4"
                className="py-6 text-center text-gray-500 italic"
              >
                Belum ada data FAQ.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
