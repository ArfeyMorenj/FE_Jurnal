import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { FaChevronDown, FaRegCircle, FaRegCircleDot } from "react-icons/fa6";
import { Icon as Iconify } from "@iconify/react";

export default function SideBarItem({
  to,
  icon,
  label,
  isSidebarOpen,
  children,
  isParent,
  depth = 0,
  sectionId,
  applicationId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isChildActive =
    children && children.some((child) => location.pathname.startsWith(child.to));
  const isActive = location.pathname === to || isChildActive;
  const isRadioItem = depth >= 1;

  // Handle navigasi dengan state untuk section/app ID
  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      
      const navigationState = {};
      
      if (sectionId) {
        navigationState.sectionId = sectionId;
      }
      
      if (applicationId) {
        navigationState.applicationId = applicationId;
      }
      
      navigate(to, {
        state: Object.keys(navigationState).length > 0 ? navigationState : undefined
      });
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <Iconify
          icon={icon}
          className={`w-4.5 h-4.5 shrink-0 transition-colors duration-200
            ${
              isActive
                ? "text-primary-red"
                : "text-[#5E5E5E] group-hover:text-primary-orange"
            }`}
        />
      );
    }

    const IconComp = icon;
    return (
      <IconComp
        className={`w-4.5 h-4.5 shrink-0 transition-colors duration-200
          ${
            isActive
              ? "text-primary-red"
              : "text-[#5E5E5E] group-hover:text-primary-orange"
          }`}
      />
    );
  };

  if (children) {
    return (
      <div className="flex flex-col relative">
        <div
          className={`relative flex items-center w-full rounded-lg transition-all duration-200 group
            ${isSidebarOpen ? "px-3 py-2.5 justify-between" : "px-2 py-2 justify-center"}
            ${isActive ? "bg-[#FFF8F2]" : "bg-white hover:bg-[#FEF5E5]"}`}
        >
          <NavLink
            to={to || "#"}
            onClick={(e) => {
              if (!to) e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            className={`flex items-center gap-3 w-full transition-all
              ${isSidebarOpen ? "" : "justify-center"}
            `}
          >
            {isRadioItem ? (
              isActive ? (
                <FaRegCircleDot className="text-primary-orange w-3.5 h-3.5 shrink-0" />
              ) : (
                <FaRegCircle className="text-[#CFCFCF] group-hover:text-primary-orange w-3.5 h-3.5 shrink-0" />
              )
            ) : (
              renderIcon()
            )}

            {isSidebarOpen && (
              <span
                className={`nunito-sans text-[13px] font-medium truncate transition-all duration-200
                  ${isActive ? "text-primary-orange font-semibold" : "text-[#5E5E5E] group-hover:text-primary-orange"}`}
              >
                {label}
              </span>
            )}
          </NavLink>

          {isSidebarOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                e.preventDefault(); 
                setIsOpen((prev) => !prev);
              }}
              className={`flex items-center justify-center w-5 h-5 rounded-full text-xs transition-all duration-300
                ${isOpen ? "rotate-180" : "rotate-0"}
                ${
                  isActive
                    ? "bg-[#FFF0EB] text-[#D93C1D]"
                    : "bg-[#EDEDED] text-[#A1A1A1] group-hover:bg-[#FFF0EB] group-hover:text-[#D93C1D]"
                }`}
            >
              <FaChevronDown />
            </button>
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px]" : "max-h-0"
          } ${isSidebarOpen ? "pl-5 mt-1" : "pl-0 mt-1"}`}
        >
          {children.map((child, index) => (
            <SideBarItem
              key={index}
              {...child}
              isSidebarOpen={isSidebarOpen}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  // Menu item tanpa children
  return (
    <button
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!isSidebarOpen) {
          setShowTooltip(true);
          buttonRef.current = e.currentTarget;
        }
      }}
      onMouseLeave={() => setShowTooltip(false)}
      className={`relative flex items-center w-full rounded-lg transition-all duration-200 group
        ${isSidebarOpen ? "px-3 py-2.5 gap-3 justify-start" : "px-2 py-2 justify-center"}
        ${isActive ? "bg-[#FFEAEB]" : "bg-white hover:bg-[#FEF5E5]"}`}
    >
      {isParent && isActive && (
        <span
          className="absolute -left-5 top-1/2 -translate-y-1/2 
          w-[4px] h-10 bg-primary-red rounded-r-lg shadow-sm"
        />
      )}

      {isRadioItem && (
        <>
          {isActive ? (
            <FaRegCircleDot className="text-primary-orange w-3.5 h-3.5 shrink-0" />
          ) : (
            <FaRegCircle className="text-[#CFCFCF] group-hover:text-primary-orange w-3.5 h-3.5 shrink-0" />
          )}
        </>
      )}

      {!isRadioItem && renderIcon()}

      {isSidebarOpen && (
        <span
          className={`nunito-sans text-[13px] font-medium transition-all duration-200
            ${
              isActive
                ? "text-primary-red font-semibold"
                : "text-[#5E5E5E] group-hover:text-primary-orange"
            }`}
        >
          {label}
        </span>
      )}

      {!isSidebarOpen && showTooltip && buttonRef.current && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: `${buttonRef.current.getBoundingClientRect().right + 12}px`,
            top: `${
              buttonRef.current.getBoundingClientRect().top +
              buttonRef.current.getBoundingClientRect().height / 2
            }px`,
            transform: "translateY(-50%)",
          }}
        >
          <div className="relative whitespace-nowrap rounded-md bg-[#FFF0EB] text-primary-red text-[13px] px-3 py-1 shadow-md border border-[#FFD4BF]
            before:content-[''] before:absolute before:top-1/2 before:-left-1.5 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-[#FFF0EB]">
            {label}
          </div>
        </div>
      )}
    </button>
  );
}