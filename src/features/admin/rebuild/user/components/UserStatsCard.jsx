import React from "react";
import { Icon } from "@iconify/react";
import CircleStat from "./CircleStat";

export default function UserStatsCard({ user, isTeacher, isStudent, isSchool }) {
  if (!isTeacher && !isStudent && !isSchool) {
    return null;
  }

  const getTitle = () => {
    if (isSchool) return "Informasi Sekolah";
    return "Koneksi Pengguna";
  };

  const getIcon = () => {
    if (isSchool) return "mdi:school";
    return "fa6-solid:users-rectangle";
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <Icon icon={getIcon()} className="text-[#CA2323] text-xl" />
        <h3 className="font-semibold text-lg">{getTitle()}</h3>
      </div>

      <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

      <div className="flex gap-6 flex-wrap justify-center">
        {isTeacher && (
          <>
            <CircleStat type="kelas" value={user.total_class || 0} />
            <CircleStat type="siswa" value={user.total_students || 0} />
            <CircleStat type="tugas" value={user.total_assignments || 0} />
            <CircleStat type="jurnal" value={user.total_jurnal || 0} />
          </>
        )}

        {isStudent && (
          <>
            <CircleStat type="mapel" value={user.total_lessons || 0} />
            <CircleStat type="tugas" value={user.total_assignments || 0} />
          </>
        )}

        {isSchool && (
          <>
            <CircleStat type="pengajar" value={user.total_teachers || 0} />
            <CircleStat type="murid" value={user.total_students || 0} />
            <CircleStat type="kelas" value={user.total_classes || 0} />
          </>
        )}
      </div>
    </div>
  );
}