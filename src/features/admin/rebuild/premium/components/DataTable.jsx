import React from "react";
import clsx from "clsx";

export default function DataTable({
  columns = [],
  data = [],
  renderRow,
  isLoading = false,
  minWidth = "900px",
  emptyText = "Tidak ada data.",
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table
        className="w-full border-collapse text-sm md:text-base"
        style={{ minWidth }}
      >
        <thead>
          <tr className="bg-[#AA494E] inter font-semibold text-[13px] text-white text-left">
            {columns.map((col, index) => (
              <th
                key={index}
                className={clsx(
                  "border-b p-3 font-bold text-white",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-gray-500 italic"
              >
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-gray-500 italic"
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
