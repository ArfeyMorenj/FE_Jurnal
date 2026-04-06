import React from "react";
import { Icon } from "@iconify/react";
import DetailRow from "./DetailRow";
import { getGender } from "../helper/userDetailHelper";

export default function UserInfoCard({ user, mappedRole }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <Icon
          icon="material-symbols:info-outline"
          className="text-[#CA2323] text-xl"
        />
        <h3 className="font-semibold text-lg">Data Diri Pengguna</h3>
      </div>

      <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <DetailRow label="Nama Pengguna" value={user.name || "-"} />
        <DetailRow
          label="Nomor Identitas (NISN/NIP)"
          value={user.identity_number || "-"}
        />
        <DetailRow label="Email" value={user.email || "-"} />
        <DetailRow label="Tanggal Lahir" value={user.birthdate || "-"} />
        <DetailRow label="Jenis Kelamin" value={getGender(user)} />
        <DetailRow label="Role" value={mappedRole} />
        <DetailRow label="Alamat" value={user.address || "-"} span />
      </div>
    </div>
  );
}