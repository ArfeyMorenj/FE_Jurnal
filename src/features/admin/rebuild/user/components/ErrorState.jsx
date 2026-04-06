import React from "react";
import { Icon } from "@iconify/react";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";

export default function ErrorState({ onBack }) {
  return (
    <div className="max-w-7xl mt-6">
      <BreadCrumbs />
      <div className="bg-white shadow-md rounded-xl p-10 text-center">
        <Icon icon="mdi:alert-circle" className="text-red-500 text-6xl mx-auto mb-4" />
        <p className="text-red-500 text-lg font-semibold">User tidak ditemukan</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-[#AA494E] text-white rounded-lg hover:bg-[#8F3B3F]"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}