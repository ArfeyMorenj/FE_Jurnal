export const roleMapping = {
  student: "Siswa",
  teacher: "Pengajar",
  school: "Sekolah",
  admin: "Admin",
};

export const genderMapping = {
  male: "Laki-Laki",
  female: "Perempuan",
};

export const roleColors = {
  Pengajar: "bg-[#FFEAEB] text-[#CA2323]",
  Siswa: "bg-[#ECF2FF] text-[#5D87FF]",
  Sekolah: "bg-[#FEF5E5] text-[#1D9375]",
  Admin: "bg-[#F3E8FF] text-[#7C3AED]",
};

export const getMappedRole = (user) => {
  return roleMapping[user.role?.[0]] || user.role?.[0] || "Unknown";
};

export const getUserStatus = (user) => {
  const isPremium = user.is_premium === 1 || user.profile?.is_premium === 1;
  return isPremium ? "Premium" : "Basic";
};

export const getGender = (user) => {
  return genderMapping[user.gender] || user.gender || "-";
};

export const getRoleChecks = (mappedRole) => {
  return {
    isTeacher: mappedRole === "Pengajar",
    isStudent: mappedRole === "Siswa",
    isSchool: mappedRole === "Sekolah",
    isAdmin: mappedRole === "Admin",
  };
};