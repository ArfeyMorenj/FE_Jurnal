import React from "react";
import { User } from "lucide-react";

const UserProfileDetail = ({ user }) => {
  return (
    <div className="w-full inter p-6 bg-white mt-6 rounded-[10px]">
      <h1 className=" text-[20px] font-semibold text-[#000405]">
        DETAIL PROFIL PENGGUNA
      </h1>

      <div className="w-[320px] h-[7px] mt-2 rounded-full bg-gradient-to-r from-primary-red to-primary-orange"></div>

      <div className="mt-10 p-6 md:p-10 rounded-xl flex flex-col md:flex-row gap-10 items-center max-w-7xl">
       <div className="w-[260px] h-[260px] md:w-[390px] md:h-[330px] bg-white rounded-xl shadow-xl flex items-center justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt="User Avatar"
              className="w-28 h-28 md:w-[234px] md:h-[234px] object-cover rounded-full"
            />
          ) : (
            <div className="w-28 h-28 md:w-[234px] md:h-[234px] bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-14 h-14 md:w-28 md:h-28 text-gray-400" />
            </div>
          )}
        </div>

        <div className="hidden md:flex">
          <div className="w-[7px] h-[320px] bg-gradient-to-b from-primary-red to-primary-orange rounded-full"></div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-black text-xs ">Nama Pengguna</p>
            <p className="font-semibold text-black text-[13px]">{user.name}</p>
          </div>

          <div>
            <p className="text-black text-xs">Alamat Email</p>
            <p className="font-semibold text-black text-[13px]">{user.email}</p>
          </div>

          <div>
            <p className="text-black text-xs">Nomor Telepon</p>
            <p className="font-semibold text-black text-[13px]">{user.phone ?? "-"}</p>
          </div>

          <div>
            <p className="text-black text-xs">Alamat</p>
            <p className="font-semibold text-black leading-relaxed text-[13px]">
              {user.address}
            </p>
          </div>

          <div>
            <p className="text-black text-xs">Jenis Akun</p>
            <p className="text-[#31BEBE] font-semibold text-[13px]">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetail;
