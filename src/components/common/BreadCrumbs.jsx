import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "../sidebar/helper/menuItems";
import { IoMdHome } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";

import { NAV_ITEMS_SCHOOL } from "../sidebar/helper/menuItemsSchool";

export default function BreadCrumbs({ manual = [], role = "admin" }) {
  const location = useLocation();
  const currentPath = location.pathname;

  //berdasarkan role
  const MENU = role === "admin" ? NAV_ITEMS : NAV_ITEMS_SCHOOL;

  const BASE = role === "admin" ? "/admin" : "/sekolah";

  const findLabelByPath = (path) => {
    for (const section of MENU) {
      for (const item of section.items) {
        if (item.to === path) {
          return {
            label:
              section.section === "Pengaturan Landing Page"
                ? `Pengaturan Halaman ${item.label}`
                : item.label,
          };
        }
      }
    }
    return null;
  };

  const segments = currentPath
    .split("/")
    .filter((seg) => seg && seg !== role);

  // base sesuai role
  let mainPath = `${BASE}/${segments[0] || ""}`;
  let mainLabel = "";

  // Custom logic untuk halaman premium
  if (segments[0] === "premium") {
    if (segments.length === 1) {
      mainLabel = "Paket Premium"; // list paket
    } else if (segments[1] === "create-premium") {
      mainLabel = "Tambah Paket Premium";
    } else if (segments[1] === "edit") {
      mainLabel = "Edit Paket Premium";
    } else if (segments[1] === "detail") {
      mainLabel = "Detail Paket Premium";
    }
  } else {
    const foundMain = findLabelByPath(mainPath);
    mainLabel = foundMain?.label || segments[0]?.replace(/-/g, " ");
  }

  const breadcrumbList = [
    { label: mainLabel, path: mainPath },
    ...manual.map((m) => ({
      label: m.label,
      path: m.path || "#",
    })),
  ];

  const lastSegment = breadcrumbList[breadcrumbList.length - 1];
  const title = lastSegment?.label || "Halaman";

  if (currentPath === `${BASE}/dashboard`) return null;

  return (
    <motion.div
      className="pb-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="inter text-lg md:text-xl font-semibold mb-2 capitalize text-[#000405]">
        {title}
      </h1>

      <nav className="inter flex items-center flex-wrap text-[10px] text-[#000405]/70">
        <Link
          to={`${BASE}/dashboard`}
          className="flex items-center gap-1 hover:text-gray-700"
        >
          <IoMdHome size={12} />
          <span>Dashboard</span>
        </Link>

        {breadcrumbList.map((seg, index) => {
          const isLast = index === breadcrumbList.length - 1;
          return (
            <div key={index} className="flex items-center gap-1">
              <span className="mx-1 text-[#000405]/70">
                <FaAngleRight size={12} />
              </span>

              {isLast ? (
                <span className="text-[#D22027] capitalize">{seg.label}</span>
              ) : (
                <Link
                  to={seg.path}
                  className={`capitalize ${
                    seg.path === "#"
                      ? "text-gray-400 cursor-default"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {seg.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
}