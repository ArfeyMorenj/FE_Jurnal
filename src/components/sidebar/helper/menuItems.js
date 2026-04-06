import { Icon } from "@iconify/react";

const COMMON_SECTIONS = [
  { label: "Hero Section", path: "hero" },
  { label: "Feature Section", path: "feature" },
  { label: "Testimonial Section", path: "testimonial" },
  { label: "FAQ Section", path: "faq" },
];

const generateJournalChildren = (basePath) =>
  COMMON_SECTIONS.map((section) => ({
    label: section.label,
    to: `/admin/${basePath}/${section.path}`,
  }));

export const NAV_ITEMS = [
  {
    section: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: "mingcute:classify-2-fill",
        to: "/admin/dashboard",
        isParent: true,
      },
    ],
  },
  {
    section: "Kelola Aplikasi",
    items: [
      {
        label: "Data Pengguna",
        icon: "fa7-solid:users",
        to: "/admin/user",
        isParent: true,
      },
      {
        label: "Riwayat Transaksi",
        icon: "icon-park-outline:bank-card-one",
        to: "/admin/riwayat-transaksi",
        isParent: true,
      },
      {
        label: "Kelola Premium",
        icon: "material-symbols:crown",
        to: "/admin/premium",
        isParent: true,
      },
    ],
  },
  {
    section: "Pengaturan Landing Page",
    items: [
      { label: "Beranda", icon: "material-symbols:home-rounded", to: "/admin/beranda", isParent: true },
      {
        label: "Daftar Aplikasi",
        icon: "grommet-icons:apps-rounded",
        to: "/admin/aplikasi",
        isParent: true,
        // children akan diisi secara dinamis dari API
        children: [],
      },
      {
        label: "Berita",
        icon: "heroicons:newspaper-solid",
        isParent: true,
        children: [
          {
            label: "Pengaturan Berita",
            to: "/admin/pengaturan-berita",
          },
          {
            label: "Ruang Berita",
            to: "/admin/berita",
          },
        ],
      },
      {
        label: "Tentang Kami",
        icon: "streamline:web-solid",
        to: "/admin/tentang",
        isParent: true,
      },
      {
        label: "Kontak",
        icon: "healthicons:contact-support",
        isParent: true,
        children: [
          {
            label: "Pengaturan Kontak",
            to: "/admin/pengaturan-kontak",
          },
          {
            label: "Kotak Masuk",
            to: "/admin/kotak-masuk",
          },
        ],
      },
    ],
  },
];
