import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import PremiumCard from "../components/PremiumCard";
import useDetailPremium from "../hooks/useDetailPremium";

export default function DetailPremiumPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { premiumData, loading } = useDetailPremium(id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <BreadCrumbs />
      </div>
    );
  }

  if (!premiumData) return null;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <BreadCrumbs manual={[{ label: "Detail Paket Premium" }]} />

      <PremiumCard
        title={premiumData.nama}
        subtitle={premiumData.masa} 
        description={premiumData.keterangan}
        price={`Rp. ${premiumData.harga}`}
        features={premiumData.benefit}
      />


      <div className="bg-white shadow-md rounded-xl p-4 flex justify-end">
        <button
          onClick={() => navigate("/admin/premium")}
          className="px-6 py-2 bg-[#8B8B8B] text-white rounded-lg hover:bg-gray-300 transition"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}