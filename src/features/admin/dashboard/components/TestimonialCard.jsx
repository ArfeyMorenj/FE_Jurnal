import React from "react";
import { IoMdStar } from "react-icons/io";
import { getImageUrl } from "../../../../utils/image";
import { formatDate } from "../../../../utils/formatDate";

/**
 * Get application badge color based on application name
 */
const getApplicationBadgeColor = (application) => {
  const appLower = application?.toLowerCase() || "";
  
  if (appLower.includes("mengajar")) {
    return "bg-[#FFEAEB] text-[#CA2323]";
  } else if (appLower.includes("siswa")) {
    return "bg-orange-50 text-orange-600";
  } else if (appLower.includes("keuangan")) {
    return "bg-blue-50 text-blue-600";
  } else if (appLower.includes("belajar")) {
    return "bg-green-50 text-green-600";
  } else {
    return "bg-gray-50 text-gray-600";
  }
};

/**
 * Render star rating - same as beranda testimonial pages
 */
const renderStars = (rating) => {
  // Ensure rating is a number and between 0-5
  const numRating = Math.max(0, Math.min(5, Number(rating) || 0));
  
  return Array.from({ length: 5 }).map((_, i) => (
    <IoMdStar
      key={i}
      size={20}
      fill={i < numRating ? "#FFAD33" : "#E5E7EB"}
      stroke="none"
      className="transition-colors"
    />
  ));
};

export default function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  const { name, comment, application, photo, rating, created_at } = testimonial;
  const badgeColor = getApplicationBadgeColor(application);
  const dateInfo = created_at ? formatDate(created_at) : null;
  const displayDate = dateInfo?.daysAgo || dateInfo?.formattedDate || "Baru saja";

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={getImageUrl(photo) || "/images/default.jpg"}
            alt={name || "User Avatar"}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "/images/default.jpg";
            }}
          />
          <div>
            <h3 className="font-semibold text-gray-800">{name || "Anonymous"}</h3>
            <p className="text-xs text-gray-500">{displayDate}</p>
          </div>
        </div>
        <span className={`${badgeColor} text-xs font-medium px-3 py-1 rounded-md`}>
          {application || "Aplikasi"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {comment || "Tidak ada komentar"}
          </p>
          <div className="flex items-center mt-4">
            {renderStars(rating || 0)}
            <span className="ml-2 text-gray-600 font-medium">
              {rating || 0} / 5
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/images/phone/phone2.png"
            alt="Phone"
            className="max-w-full h-auto object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
}

