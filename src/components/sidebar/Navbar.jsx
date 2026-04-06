import { useState, useRef, useEffect } from "react";
import { AlignJustify, ChevronDown, LogOut, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout as logoutUser } from "../../features/auth/services/authService";
import { useProfile } from "../../features/admin/rebuild/profile/hooks/useProfile";
import { FaUser } from "react-icons/fa6";
import { User } from "lucide-react";
import { Icon } from "@iconify/react";

export default function Navbar({
  toggleSidebar,
  isSidebarOpen,
  isMobile,
  role = "admin",
  schoolCode = "WeXo18",
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = profile?.name || "Nama saya Mijurnal";
  const displayEmail = profile?.email || "user@email.com";
  const displayRole = profile?.role || "Adminnya Mijurnal";
  const avatar = profile?.image || "/images/catphoto.jpeg";

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setIsDropdownOpen(false);

    await logoutUser({ remember: true });
    setIsLoggingOut(false);
    navigate("/login", { replace: true });
  };

  return (
    <header
      className={`fixed top-0 right-0 h-[70px] bg-white shadow-sm z-25 flex items-center justify-between px-6 transition-all duration-500 ease-in-out
      ${isMobile ? "left-0" : isSidebarOpen ? "left-[275px]" : "left-[64px]"}`}
    >
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <AlignJustify className="text-gray-700" size={22} />
      </button>

      <div
        className="relative flex items-center justify-end gap-5 w-full"
        ref={dropdownRef}
      >
        {role === "sekolah" && (
          <div className="hidden inter md:flex items-center text-[#434343] px-4 py-1.5 rounded-lg font-semibold text-[17px]">
            Kode Sekolah:{" "}
            <span className="ml-1 font-bold text-[#AA494E]">{schoolCode}</span>
          </div>
        )}

        <button
          onClick={toggleDropdown}
          className="flex items-center gap-3 focus:outline-none"
          disabled={isLoadingProfile}
        >
          {isLoadingProfile ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          ) : avatar ? (
            <img
              src={avatar}
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}

          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="nunito-sans font-bold text-[#000405] text-[13px]">
              {displayName}
            </span>
            <span className="text-[10px] font-semibold nunito-sans text-[#000405]/50 flex items-center gap-1">
              <Mail size={10} />
              {displayEmail}
            </span>
          </div>

          <ChevronDown
            size={22}
            className={`text-[#000405]/50 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-[75px]">
            {role === "sekolah" ? (
              <div className="bg-white w-[320px] rounded-[16px] shadow-lg border border-gray-200 p-6 animate-fadeIn">

                <div className="flex gap-4 items-center mb-5">
                  {avatar ? (
                    <img
                      src={avatar}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-7 h-7 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <p className="font-bold text-base text-[#000405]">
                      {displayName}
                    </p>
                    <p className="text-sm text-[#7A7A7A] capitalize">
                      {displayRole}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#434343] mt-1">
                      <Mail size={12} /> {displayEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap
                      ${profile?.is_premium 
                        ? "bg-[#FEF5E5] text-[#EA5E14]" 
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    <Icon 
                      icon={profile?.is_premium ? "material-symbols:crown" : "mdi:account-outline"} 
                      width="12" 
                      height="12" 
                    />
                    {profile?.is_premium ? "Premium" : "Basic"}
                  </span>

                  {profile?.is_premium && (
                    <div className="flex flex-col leading-tight">
                      <span className="text-[12px] text-[#434343]">
                        Masa Berlaku:
                      </span>
                      <span className="text-[11px] text-[#434343] font-semibold">
                        s.d {profile?.expired_date || "-"}
                      </span>
                    </div>
                  )}
                </div>

                <hr className="my-4 border-[#D9D9D9]/70" />

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full py-2.5 flex items-center justify-center gap-2 
                    bg-[#FFE5E7] text-primary-red hover:bg-[#FFD9DC] rounded-lg 
                    font-semibold text-sm transition disabled:opacity-70"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Mengeluarkan...
                    </>
                  ) : (
                    <>
                      Logout <LogOut size={14} />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-[12px] shadow-lg border border-gray-200 p-5 w-[250px] animate-fadeIn">

                <div className="flex items-center gap-3 mb-4">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="User"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-sm text-[#434343]">
                      {displayName}
                    </p>
                    <p className="text-xs text-[#434343] capitalize">
                      {displayRole}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#434343] mt-1">
                      <Mail size={12} /> {displayEmail}
                    </div>
                  </div>
                </div>

                <hr className="border-[#D9D9D9]/80 my-4" />

                <button
                  onClick={() => navigate("/admin/profile")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 
                    bg-primary-red text-white rounded-lg 
                    font-semibold text-sm transition hover:bg-[#B21E1E]"
                >
                  <FaUser size={14} /> Profil Saya
                </button>

                <div className="h-3" />

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 py-2.5 
                    text-primary-red bg-[#FFEAEB] hover:bg-[#FFE1E3] 
                    rounded-lg font-semibold text-sm transition 
                    disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Mengeluarkan...
                    </>
                  ) : (
                    <>
                      Logout <LogOut size={14} />
                    </>
                  )}
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
