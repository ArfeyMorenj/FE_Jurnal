import React from "react";

export default function ReusableTable({
  columns = [],
  data = [],
  actions = [],
  emptyText = "Belum ada data.",
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#EBF1F6]">
      <table className="w-full min-w-[0] text-sm border-collapse">
        <thead>
          <tr className="bg-[#AA494E] text-white inter text-[13px] font-semibold">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3 px-4 ${col.center ? "text-center" : "text-left"}`}
                style={{ width: col.width || "auto" }}
              >
                {col.title}
              </th>
            ))}

            {actions.length > 0 && (
              <th className="py-3 px-4 text-center">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-gray-50 transition border-b border-[#EBF1F6]"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-4 inter text-[13px] text-black ${
                      col.center ? "text-center" : ""
                    }`}
                  >
                    {col.render ? col.render(row) : row[col.dataIndex]}
                  </td>
                ))}

                {actions.length > 0 && (
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {actions.map((action, actIdx) => (
                        <action.icon
                          key={actIdx}
                          size={18}
                          className="cursor-pointer p-2 rounded-full transition"
                          style={{
                            color: action.color,
                            backgroundColor: action.bg || "transparent",
                          }}
                          onClick={() => action.onClick(row)}
                        />
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions.length ? 1 : 0)}
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
