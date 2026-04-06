import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
import { highlightMiJurnal } from "../../../../utils/highlightMiJurnal";
import { useHero } from "../hooks/useHero";
import { getImageUrl } from "../../../../utils/image";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const HeroDetailPage = () => {
  const { sectionId, bannerId } = useParams();
  const { handleShow } = useHero(sectionId)

  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const data = await handleShow(sectionId, bannerId);
      setHeroData(data);
      setLoading(false);
    };  
    if (bannerId) fetchDetail();
  }, [bannerId]);

  if (loading) {
    return <LoadingSpinner text="Memuat detail hero..." />;
  }

  if (!heroData) {
    return <div className="p-8 text-center text-gray-500">Data hero tidak ditemukan.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs manual={[
            { label: 'Hero Section', path: '/admin/beranda/hero-section' },
            { label: 'Detail Hero Section' },]} />

      <div className="p-8 bg-white rounded-[10px]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 max-w-[725px]">
          <img
            src={getImageUrl(heroData.image)}
            alt={heroData.title}
            onError={(e) => (e.target.src = "/images/default.jpg")}
            className="w-[180px] md:w-[230px] object-contain"
          />

          <p
            className="text-[#1F1C14] font-medium text-lg md:text-[24px] leading-snug md:leading-[1.4]"
          > {highlightMiJurnal(heroData.title)} </p>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <p className="text-[#1F1C14] text-base md:text-[20px] leading-relaxed">
            {heroData.description}
          </p>

          <hr className="border-[#D9D9D9]/80 mb-2" />

          <div className="text-sm text-[#1F1C14]">
            <span className="font-medium">Link tombol button lihat selengkapnya :</span>
            <br />
            <a
              href={heroData.button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2B73FF] hover:underline break-all"
            >
              {heroData.button_link}
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-5 bg-white rounded-[10px]">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default HeroDetailPage;
