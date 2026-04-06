import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import SideBarItem from "./SideBarItem";
import { NAV_ITEMS } from "./helper/menuItems";
import { useApplicationMenuItems } from "./hooks/useApplicationMenuItems";
import { useMemo } from "react";
import { NAV_ITEMS as NAV_ADMIN } from "./helper/menuItems";
import { NAV_ITEMS_SCHOOL } from "./helper/menuItemsSchool";

export default function Sidebar({ isSidebarOpen, toggleSidebar, isMobile, role}) {
  const menu = role === "sekolah" ? NAV_ITEMS_SCHOOL : NAV_ADMIN;
  const { menuItems: applicationMenuItems, isLoading: isLoadingApplications } = useApplicationMenuItems();

  // Merge NAV_ITEMS dengan aplikasi dinamis
  const mergedNavItems = useMemo(() => {
    return menu.map((group) => {
      // Cari group "Pengaturan Landing Page"
      if (group.section === "Pengaturan Landing Page") {
        return {
          ...group,
          items: group.items.map((item) => {
            if (item.label === "Daftar Aplikasi") {
              return {
                ...item,
                children: isLoadingApplications ? [] : applicationMenuItems,
              };
            }
            return item;
          }),
        };
      }
      return group;
    });
  }, [menu, applicationMenuItems, isLoadingApplications]);


  return (
    <>
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col transition-all duration-500
        overflow-visible
        ${
          isMobile
            ? isSidebarOpen
              ? "translate-x-0 w-[275px]"
              : "-translate-x-full w-[275px]"
            : isSidebarOpen
            ? "w-[275px]"
            : "w-[64px]"
        }`}
      >
        <div className="relative flex items-center justify-center py-8">
          <div className="flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Mi Jurnal"
              className={`transition-all duration-300 ${
                (isSidebarOpen && !isMobile) || isMobile ? "block" : "hidden"
              } w-[170px]`}
            />

            <img
              src="/logo.png"
              alt="Mi Jurnal"
              className={`transition-all duration-300 ${
                !isSidebarOpen && !isMobile ? "block" : "hidden"
              } w-6`}
            />
          </div>

          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="absolute -right-3 top-8 -translate-y-1/2 w-7.5 h-7.5 flex items-center justify-center rounded-full 
              bg-gradient-to-r from-primary-orange to-primary-red text-white shadow-md hover:scale-105 transition-transform"
            >
              {isSidebarOpen ? <FaArrowLeft size={12} /> : <FaArrowRight size={12} />}
            </button>
          )}
        </div>

        <nav
          className={`mt-4 flex-1 overflow-y-auto transition-all duration-500
          ${isSidebarOpen ? "px-5" : "px-2"}`}
        >
          {mergedNavItems.map((group, idx) => (
            <div key={idx} className="mb-4">
              <p
                className={`nunito-sans font-semibold text-[#000405] tracking-[0.02em] mb-2 transition-all duration-500 
                truncate whitespace-nowrap select-none
                ${
                  isSidebarOpen
                    ? "text-xs md:text-sm max-w-[140px] opacity-100"
                    : "text-[10px] max-w-[40px] opacity-80"
                }`}
              >
                {group.section}
              </p>

              <div className="flex flex-col gap-1">
                {group.items.map((item, index) => (
                  <SideBarItem
                    key={index}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    isSidebarOpen={isSidebarOpen}
                    children={item.children}
                    isParent={item.isParent}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
