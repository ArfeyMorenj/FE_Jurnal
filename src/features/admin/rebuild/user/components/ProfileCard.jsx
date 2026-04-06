import React from "react";
import { Icon } from "@iconify/react";
import { roleColors } from "../helper/userDetailHelper";

export default function ProfileCard({ user, mappedRole, userStatus, isPremium }) {
  const renderRole = (role) => {
    return (
      <span className={`px-3 py-1 font-bold text-xs rounded-lg ${roleColors[role]}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center">
      <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {user.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon
            icon="mdi:account-circle"
            className="w-full h-full text-gray-400"
            style={{ objectFit: "cover" }}
        />
        )}
      </div>

      <h2 className="text-lg font-semibold mt-4 text-center">
        {user.name || "-"}
      </h2>

      <div className="flex gap-2 mt-2">
        {renderRole(mappedRole)}

        <span
          className={`px-3 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1 
            ${
              userStatus === "Premium"
                ? "bg-[#FEF5E5] text-[#E45E14]"
                : "bg-[#F2F2F7] text-[#5E5E5E]"
            }`}
        >
          {userStatus === "Premium" && (
            <Icon
              icon="material-symbols:crown"
              className="text-[#E45E14] text-base"
            />
          )}
          {userStatus}
        </span>
      </div>

      {isPremium && user.premium_expired_at && (
        <>
          <p className="text-xs text-gray-500 mt-4">Masa Berlaku:</p>
          <p className="text-sm font-bold">{user.premium_expired_at}</p>
        </>
      )}
    </div>
  );
}