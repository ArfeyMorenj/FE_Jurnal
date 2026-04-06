import {
  FiHome,
  FiBox,
  FiBookOpen,
  FiInfo,
  FiPhone,
  FiBook
} from "react-icons/fi";
import { LuNotebook, LuGraduationCap, LuCalendar, LuLayoutGrid } from "react-icons/lu";

export const MENU_ITEMS = [
  { id: "beranda", label: "Beranda", icon: FiHome, route: "/" },
  { 
    id: "aplikasi", 
    label: "Aplikasi", 
    icon: FiBox, 
    hasDropdown: true, 
    submenu: [
      { 
        id: "jurnal-mengajar", 
        label: "Jurnal Mengajar", 
        route: "/aplikasi/jurnal-mengajar",
        description: "Aplikasi untuk mencatat absensi, jurnal, nilai pelajaran, pengingat, dan komunikasi guru-siswa.",
        icon: LuNotebook,
        image: '/images/jurnal-mengajar.png'
      },
      { 
        id: "jurnal-siswa", 
        label: "Jurnal Siswa", 
        route: "/aplikasi/jurnal-siswa",
        description: "Aplikasi siswa untuk atur jadwal, tugas, catatan belajar, pengingat, dan daftar mata pelajaran.",
        icon: LuGraduationCap,
        image: '/images/jurnal-siswa.png'
      },
      { 
        id: "jurnal-kehadiran", 
        label: "Jurnal Kehadiran", 
        route: "/aplikasi/jurnal-kehadiran",
        description: "Mudah mengatur absensi siswa dan laporan kehadiran.",
        icon: LuCalendar,
        image: '/images/jurnal-mengajar.png'
      },
      {
        id: "lihat-semua",
        label: "Lihat Semua Aplikasi",
        route: "/aplikasi",
        isButton: true,
        icon: LuLayoutGrid
      }
    ]
  },
  { id: "berita", label: "Berita", icon: FiBookOpen, route: "/berita" },
  { id: "tentang", label: "Tentang Kami", icon: FiInfo, route: "/tentang-kami" },
  { id: "kontak", label: "Kontak", icon: FiPhone, route: "/kontak" },
]

