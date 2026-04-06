export const circleStatConfig = {
  // Untuk Teacher
  kelas: {
    color: "#FEEAEA",
    text: "#CA2323",
    label: "Banyak Kelas Yang Diajar",
  },
  siswa: {
    color: "#FFF4D9",
    text: "#E6AA14",
    label: "Banyak Siswa Yang Tergabung Pada Kelas",
  },
  tugas: {
    color: "#E7F5F0",
    text: "#15803D",
    label: "Banyak Tugas Yang Dibuat",
  },
  jurnal: {
    color: "#EAF0FF",
    text: "#4F46E5",
    label: "Banyak Jurnal Yang Dibuat",
  },

  // Untuk Student
  mapel: {
    color: "#FEEAEA",
    text: "#CA2323",
    label: "Tergabung Pada Banyak Mapel",
  },

  // Untuk School
  pengajar: {
    color: "#E7F5F0",
    text: "#15803D",
    label: "Total Pengajar",
  },
  murid: {
    color: "#FFF4D9",
    text: "#E6AA14",
    label: "Total Siswa",
  },
};

// Helper function untuk get config
export const getStatConfig = (type) => {
  return circleStatConfig[type];
};