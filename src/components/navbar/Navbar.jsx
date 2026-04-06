import NavbarDesktop from "./components/NavbarDekstop";
import NavbarDrawer from "./components/NavbarDrawer";
import LoginButton from "../common/LoginButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApplications } from "../../features/applications/hooks/useApplications";
import { highlightJurnal } from "../../utils/highlightMiJurnal";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { applications, isLoading } = useApplications();
  
  useEffect(() => {
    setOpenDropdown(false);
  }, [location]);

  // Handle navigation dengan Section ID dan aplikasi ID
  const handleAppClick = (app) => {
    const sectionId = app.section?.id;
    const appId = app.id;
    const slug = app.slug;
    
    setOpenDropdown(false);
    
    navigate(`/aplikasi/${slug}`, {
      state: {
        sectionId,
        applicationId: appId,
        applicationName: app.name || app.lead_in_text
      }
    });
  };

  // Transform API applications to navbar format
  const applicationItems = applications.map((app) => ({
    ...app,
    
    id: app.id,
    label: app.lead_in_text || app.name,
    route: `/aplikasi/${app.slug}`,
    description: app.description || app.lead_in_text || "",
    image: "/logo.png", // Image default
    
    slug: app.slug,
    section: app.section,
  }));

  return (
    <nav className="w-full bg-white sticky top-0 z-[1000] relative">
      <div className="flex items-center justify-between w-full p-4">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Mi Jurnal" className="h-8 w-auto" />
        </div>

        <div className="flex justify-center flex-1">
          <NavbarDesktop
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            applications={applicationItems}
            isLoading={isLoading}
            onAppClick={handleAppClick}
          />
        </div>

        <div className="flex items-center">
          <div className="hidden md:block">
            <LoginButton
              className="px-7 py-1.5 border text-[15px] font-semibold border-primary-red text-primary-red rounded-lg hover:bg-primary-red hover:text-white"
            >
              Masuk
            </LoginButton>
          </div>

          <div className="md:hidden ml-3">
            <NavbarDrawer 
              applications={applicationItems}
              isLoading={isLoading}
              onAppClick={handleAppClick}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openDropdown && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 bottom-0 top-30 bg-black/30 z-40"
              onClick={() => setOpenDropdown(false)}
            />

            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 600 }} 
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute left-0 top-full w-full bg-white shadow-lg rounded-b-lg z-50 md:block overflow-hidden"
            >
              <div className="flex mx-auto gap-10 items-start pt-6">
                <div className="flex-shrink-0 self-end">
                  <img
                    src="/images/illustration.png"
                    alt="Illustration"
                    className="max-h-70 object-contain"
                  />
                </div>

                <div className="flex flex-col p-8 min-h-[300px] gap-2 flex-1 min-w-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-gray-500">Memuat aplikasi...</p>
                    </div>
                  ) : applicationItems.length > 0 ? (
                    <>
                      <div className="w-full overflow-x-auto overflow-y-hidden pb-2 -mx-2 px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                        <div className="flex gap-4" style={{ display: 'inline-flex', flexWrap: 'nowrap', width: 'max-content' }}>
                          {applicationItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleAppClick(item)}
                              className="hover:bg-[#FFEAEB] p-4 rounded-lg cursor-pointer flex flex-col gap-3 flex-shrink-0 text-left"
                              style={{ minWidth: '280px', maxWidth: '280px' }}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.image}
                                  alt={item.label}
                                  className="h-12 w-12 object-contain flex-shrink-0"
                                />
                                <p className="inter text-black font-bold whitespace-nowrap text-xl">
                                  {highlightJurnal(item.label)}
                                </p>
                              </div>
                              <p className="inter text-[#000000] text-base line-clamp-2" style={{ fontSize: '20px' }}>
                                {item.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex justify-end">
                        <button
                          onClick={() => {
                            setOpenDropdown(false);
                            navigate("/aplikasi");
                          }}
                          className="px-5 py-2 text-xs border border-primary-red text-primary-red rounded-lg hover:bg-primary-red hover:text-white transition-colors flex items-center gap-2"
                        >
                          <span>Lihat Semua Aplikasi</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-gray-500">Tidak ada aplikasi tersedia</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;