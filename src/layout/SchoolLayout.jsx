import { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/sidebar/Navbar";
import Sidebar from "../components/sidebar/SideBar";
import { getStoredUser, extractUserRole } from "../features/auth/services/authService";

export default function SchoolLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    const user = getStoredUser();
    const role = extractUserRole(user);

    if (role !== "school") {
      // Blokir non-school mengakses /sekolah
      const fallbackPath = role === "admin" ? "/admin/dashboard" : "/login";
      navigate(fallbackPath, { replace: true });
      return;
    }

    setIsCheckingAuth(false);
  }, [navigate, location.pathname]);

  if (isCheckingAuth) {
    return null;
  }


  return (
    <>
      <Sidebar
        role='sekolah'
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <Navbar
        role="sekolah"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <main
        className={`pt-[70px] transition-all duration-300 ${
          isMobile ? "ml-0" : isSidebarOpen ? "ml-[275px]" : "ml-[64px]"
        }`}
      >
        <div className="p-8 bg-[#F6F6F6] min-h-screen">
          <Outlet />
        </div>
      </main>
    </>
  );
}
