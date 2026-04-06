import Button from "../../../../components/common/Button";
import InfoBar from "../../../../components/common/InfoBar";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import HeroTable from "../components/HeroTable";
import HeroAddModal from "../components/HeroAddModal";
import HeroEditModal from "../components/HeroEditModal";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import { useHero } from "../hooks/useHero"; 
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { SECTION_IDS } from "../../../../constants/sections";

export default function HeroSectionPage() {
  const navigate = useNavigate();
  const SECTION_ID = SECTION_IDS.LANDING_PAGE;
  const {
    heroes,
    loading,
    selected,
    showModal,
    setShowModal,
    handleCreate,
    handleEdit,
    handleDelete,
    fetchHero,
  } = useHero(SECTION_ID);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <BreadCrumbs manual={[{ label: "Hero Section" }]} />

      <InfoBar
        message={
          <>
            Hero Section mendukung maksimal hingga{" "}
            <span className="bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text text-transparent font-semibold">
              5 slide
            </span>
            . Tekan{" "}
            <span className="bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text text-transparent font-semibold">
              Tambah Slide
            </span>{" "}
            untuk menambahkan slide baru.
          </>
        }
      />

      <div className="p-7.5 bg-white rounded-[10px]">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={handleCreate}
            className="flex items-center gap-1 inter text-xs md:text-[15px] font-medium group"
          >
            <IoAddCircleOutline className="h-3 w-3 md:w-5 md:h-5 text-primary-red" />
            <span className="relative bg-gradient-to-b from-primary-orange to-primary-red bg-clip-text text-transparent after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-[#E45E14] after:to-[#CA2323] group-hover:after:w-full after:transition-all after:duration-300">
              Tambah Slide
            </span>
          </button>
        </div>

        {loading ? (
          <LoadingSpinner text="Memuat data hero..." />
        ) : (
          <div className="p-7.5 bg-white rounded-[10px]">
            <HeroTable
              data={heroes}
              onView={(item) => {
          navigate(`/admin/beranda/hero-section/${item.section.id}/${item.id}`);
        }}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
        <div className="flex gap-3 self-end sm:self-auto">
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
          >
            Kembali
          </Button>
        </div>
      </div>
      <HeroAddModal
        isOpen={showModal && !selected}
        onClose={() => setShowModal(false)}
        onSave={fetchHero}
        sectionId={SECTION_ID}
      />
      <HeroEditModal
        isOpen={showModal && !!selected}
        onClose={() => setShowModal(false)}
        hero={selected}
        onUpdate={fetchHero}
        sectionId={SECTION_ID}
      />
      <DeleteConfirmModal />
    </div>
  );
}
