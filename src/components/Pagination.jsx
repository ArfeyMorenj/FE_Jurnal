import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); 

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm ${
            currentPage === 1
              ? "text-[#33065650] border-[#33065650] cursor-not-allowed"
              : "text-[#33065670] border-[#33065670] hover:bg-[#33065610]"
          }`}
        >
          <FaChevronLeft size={12} />
        </button>

        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-[#33065660]">...</span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition-all ${
                currentPage === page
                  ? "bg-[#E45E14] text-white border-[#E45E14]"
                  : "text-[#33065670] border-[#33065670] hover:bg-[#33065610]"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm ${
            currentPage === totalPages
              ? "text-[#33065650] border-[#33065650] cursor-not-allowed"
              : "text-[#33065670] border-[#33065670] hover:bg-[#33065610]"
          }`}
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
