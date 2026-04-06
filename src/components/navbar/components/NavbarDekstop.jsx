import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "../helper/NavItems";
import { FiChevronDown } from "react-icons/fi";

const NavbarDesktop = ({ openDropdown, setOpenDropdown, applications = [], isLoading = false }) => {
  return (
    <div className="hidden md:flex items-center space-x-10">
      {MENU_ITEMS.map((item) =>
        item.id === "aplikasi" ? (
          <button
            key={item.id}
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="flex items-center gap-1 relative pb-1 text-black transition-colors hover:text-[#D22027] text-[15px] font-semibold"
          >
            {item.label}
            <FiChevronDown
              className={`transition-transform duration-300 ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          <NavLink
            key={item.id}
            to={item.route}
            className={({ isActive }) =>
              `relative pb-1 text-black transition-colors hover:text-[#D22027]
              after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#D22027] after:transition-all after:duration-300
              hover:after:w-full h-full text-[15px] font-semibold
              ${isActive ? "text-primary-red after:w-full" : ""}`
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </div>
  );
};

export default NavbarDesktop;
