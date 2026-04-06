export const sortOptions = [
  { value: "desc", label: "Terbaru" },   
  { value: "asc", label: "Terlama" }     
];

export const statusOptions = [
  { value: "1", label: "Sudah dibaca" },
  { value: "0", label: "Belum dibaca" }
];

// Global attendance status options for filters
export const attendanceStatusOptions = [
  { value: "", label: "Semua Status" },
  { value: "permit", label: "Izin" },
  { value: "sick", label: "Sakit" },
  { value: "presence", label: "Hadir" },
  { value: "alpha", label: "Alpha" },
];

export const absenceOptions = [
  { value: "", label: "Semua Status" },
  { value: "presence", label: "Hadir" },
  { value: "alpha", label: "Alpha" },
  { value: "permit", label: "Izin" },
  { value: "sick", label: "Sakit" },
];

export const STATUS_MAP = {
  sick: "Sakit",
  permit: "Izin",
  alpha: "Alpha",
  present: "Hadir",
};

export const STATUS_COLOR_MAP = {
  presence: "bg-green-100 text-green-700",
  alpha: "bg-red-100 text-red-700",
  permit: "bg-blue-100 text-blue-700",
  sick: "bg-yellow-100 text-yellow-700",
};