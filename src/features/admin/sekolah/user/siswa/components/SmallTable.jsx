// components/SmallTable.jsx
import React from "react";
import { Icon } from "@iconify/react";

export default function SmallTable({ title, icon = "mdi:book-open-page-variant", children }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon icon={icon} className="text-[#CA2323] text-xl" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mb-4" />
      {children}
    </div>
  );
}
