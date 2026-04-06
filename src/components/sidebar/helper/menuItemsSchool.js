import { Icon } from "@iconify/react";

export const NAV_ITEMS_SCHOOL = [
  {
    section: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: "mingcute:classify-2-fill",
        to: "/sekolah/dashboard",
        isParent: true,
      },
    ],
  },

  {
    section: "Kelola Aplikasi",
    items: [
      {
        label: "Daftar Kelas",
        icon: "material-symbols:menu-book-outline",
        to: "/sekolah/kelas",
        isParent: true,
      },
      {
        label: "Daftar Pengguna",
        icon: "fa7-solid:users",
        isParent: true,
        children: [
          {
            label: "Daftar Pengajar",
            to: "/sekolah/pengguna/pengajar",
          },
          {
            label: "Daftar Siswa",
            to: "/sekolah/pengguna/siswa",
          },
        ],
      },
      {
        label: "Riwayat Transaksi",
        icon: "icon-park-outline:bank-card-one",
        to: "/sekolah/riwayat-transaksi",
        isParent: true,
      },
      {
        label: "Paket Premium",
        icon: "material-symbols:crown",
        to: "/sekolah/paket-premium",
        isParent: true,
      },
    ],
  },
];
