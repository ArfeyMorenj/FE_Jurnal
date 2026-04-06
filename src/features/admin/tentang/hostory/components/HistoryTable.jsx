import { Pencil, Trash2 } from 'lucide-react';
import ActionButton from "../../../../../components/common/ActionButton";

const HistoryTable = ({
    items = [], 
    indexOfFirstItem = 0,
    onEdit,
    onDelete
}) => {
    return (
        <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-12">
                <div className="overflow-x-auto rounded-xl">
                    <table className="w-full border-l border-r border-gray-200">
                        <thead className="bg-[#AA494E] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium">No</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Tahun</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Deskripsi</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item, index) => (
                                <tr 
                                    key={item.id ?? index}
                                    className={`hover:bg-gray-50 ${
                                        index === items.length - 1 ? "border-b border-gray-200" : ""
                                    }`}
                                >
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {indexOfFirstItem + index + 1}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-900">{item.year}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>

                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <div className="flex gap-2">

                                            <ActionButton
                                                onClick={() => onEdit(item, index)}
                                                icon={Pencil}
                                                color="#F0A206"
                                                size={16}
                                                className="w-8 h-8"
                                            />

                                            <ActionButton
                                                onClick={() => onDelete(item, index)}
                                                icon={Trash2}
                                                color="#DC2626"
                                                hoverBg="#FEF2F2"
                                                size={16}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>               
            </div>
        </div>
    );
};

export default HistoryTable;

