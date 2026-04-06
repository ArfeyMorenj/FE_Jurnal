import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import InputField from "../../../../components/common/InputField";
import { Icon } from "@iconify/react";
import ActionButton from "../../../../components/common/ActionButton";
import { useDeleteModal } from "../../../../store/useDeleteModal";

export default function HighlightTable({ rows, updateRow, updateRowArray, deletePoint, errors }) {
  const { openDeleteModal } = useDeleteModal();

  const handleDelete = (index) => {
    openDeleteModal(index, () => confirmDelete(index));
  };

  const handleImageChange = (index, file) => {
    if (!file) return;
    const newRow = { ...rows[index], image: file };

    const reader = new FileReader();
    reader.onload = () => {
      newRow.preview = reader.result;
      updateRow(index, newRow);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (index, value) => {
    updateRow(index, {
      ...rows[index],
      text: value,
    });
  };

  const removeImage = (index) => {
    const newRow = { ...rows[index], image: null, preview: null };
    updateRow(index, newRow);
  };

  const confirmDelete = (index) => {
    const row = rows[index];

    if (row.id && deletePoint) deletePoint(row.id);

    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      text: "",
      image: null,
      preview: null,
    };

    updateRowArray(newRows);
  };

  return (
    <>
      <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full min-w-[700px] border-collapse">
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[60%]" />
            <col className="w-[20%]" />
          </colgroup>

          <thead>
            <tr className="bg-[#AA494E] text-white text-[13px] font-semibold inter">
              <th className="p-2 text-center ">Icon</th>
              <th className="p-2 text-left ">Keterangan</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-5 px-3 text-center align-top ">
                  <div className="relative w-20 h-20 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-100 mx-auto">
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none rounded-lg"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="calc(100% - 1px)"
                        height="calc(100% - 1px)"
                        rx="5"
                        ry="5"
                        fill="none"
                        stroke="rgba(139, 139, 139, 0.7)"
                        strokeWidth="1"
                        strokeDasharray="5 5"
                      />
                    </svg>

                    {row.preview || row.image ? (
                      <>
                        <img
                          src={row.preview || row.image}
                          alt="icon"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs z-20 hover:bg-red-600 shadow-lg"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <label className="flex flex-col items-center text-[#8B8B8B] text-sm cursor-pointer z-10">
                        <span className="text-xl">
                          <img
                            src="/images/photo.png"
                            alt="Tambah Gambar"
                            className="w-[50px] h-[50px] mb-1"
                          />
                        </span>
                        <span className="text-[7px] font-medium inter">
                          Tambah Gambar
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                          }
                        />
                      </label>
                    )}
                  </div>
                  {errors?.[index]?.image && (
                    <p className="text-red-500 text-xs text-center mt-2">
                      {errors[index].image}
                    </p>
                  )}
                </td>

                <td className="py-5 px-3 align-middle ">
                  <InputField
                    inputStyle="!mb-0"
                    name={`rows_${index}_text`}
                    placeholder="Masukkan keterangan"
                    value={row.text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    error={errors?.[index]?.text}
                  />
                </td>

                <td className="py-5 px-3 text-center align-middle">
                  <ActionButton
                    onClick={() => handleDelete(index)}
                    icon={Trash2}
                    color="#AA494E"
                    hoverBg="#FFF1F1"
                    size={17}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}