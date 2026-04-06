import React from "react";

export default function LoadingSpinner({ text = "Memuat..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] rounded-[10px]">
      <div className="mb-4">
        <div
          className="w-12 h-12 border-4 border-primary-red border-t-transparent rounded-full animate-spin"
          role="status"
        />
      </div>

      <h5 className="text-gray-900 font-semibold text-lg mb-1">
        Memuat Data
      </h5>
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
}
