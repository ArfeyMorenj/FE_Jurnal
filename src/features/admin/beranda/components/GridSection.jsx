import { useNavigate } from "react-router-dom";
import { sectionsData } from "../data/sectionsData";
import NavCard from "../../../../components/common/NavCard";

export default function GridSection() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 justify-items-center">
      {sectionsData.map((section, index) => (
        <NavCard
          key={index}
          icon={section.icon}
          title={section.title}
          onClick={() => navigate(section.path)}
        />
      ))}
    </div>
  );
}
