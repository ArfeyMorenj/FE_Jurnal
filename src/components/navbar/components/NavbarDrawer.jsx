import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MENU_ITEMS } from "../helper/NavItems";
import LoginButton from "../../common/LoginButton";
import { motion, AnimatePresence } from "framer-motion";
import { highlightJurnal } from "../../../utils/highlightMiJurnal";

const NavbarDrawer = ({ 
  applications = [], 
  isLoading = false,
  onAppClick  
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleAppClick = (app) => {
    setIsOpen(false);  
    
    if (onAppClick) {
      onAppClick(app);  
    }
  };

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)}>
        <FiMenu className="text-2xl" />
      </button>

      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-[1100] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-[1200] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <img src="/images/logo.png" alt="Mi Jurnal" className="h-6 w-auto" />
          <button onClick={() => setIsOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col space-y-2 p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          {MENU_ITEMS.map((item) => (
            <div key={item.id}>
              {!item.hasDropdown ? (
                <NavLink
                  to={item.route}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-primary-red bg-primary-red/10 border-l-4 border-primary-red font-medium"
                        : "text-gray-700 hover:text-primary-red"
                    }`
                  }
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:text-primary-red"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="text-lg" />
                      <span>{item.label}</span>
                    </div>
                    {openDropdown === item.id ? (
                      <FiChevronUp className="text-lg" />
                    ) : (
                      <FiChevronDown className="text-lg" />
                    )}
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="ml-4 mt-2 flex flex-col gap-2 border-l border-gray-200 overflow-hidden"
                      >
                        {isLoading ? (
                          <div className="px-3 py-2 ml-2 text-sm text-gray-500">
                            Memuat aplikasi...
                          </div>
                        ) : applications.length > 0 ? (
                          <>
                            {applications.map((app) => (
                              <button
                                key={app.id}
                                onClick={() => handleAppClick(app)}
                                className="flex items-center gap-2 px-3 py-2 ml-2 rounded-md transition-colors text-sm text-left text-gray-600 hover:text-primary-red hover:bg-primary-red/10"
                              >
                                <span>{highlightJurnal(app.label)}</span>
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                navigate("/aplikasi");
                              }}
                              className="flex items-center gap-2 px-3 py-2 ml-2 rounded-md transition-colors text-sm text-left text-gray-600 hover:text-primary-red hover:bg-primary-red/10"
                            >
                              <span>Lihat Semua Aplikasi</span>
                            </button>
                          </>
                        ) : (
                          <div className="px-3 py-2 ml-2 text-sm text-gray-500">
                            Tidak ada aplikasi tersedia
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
          <LoginButton className="mt-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white">
            Masuk
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default NavbarDrawer;