import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/sidebar/Navbar";
import Sidebar from "../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { getStoredUser, extractUserRole } from "../features/auth/services/authService";

export default function ProtectedLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    const user = getStoredUser();
    const role = extractUserRole(user);

    if (role !== "admin") {
      // Blokir non-admin mengakses /admin
      const fallbackPath = role === "school" ? "/sekolah/dashboard" : "/login";
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
        role="admin"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
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
