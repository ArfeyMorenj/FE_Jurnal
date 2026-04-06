import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import { CARD_STYLES } from "../../../tentang/constants/tentangConstants";
import ActionButtons from "../../../tentang/components/ActionButtons";
import UserProfileDetail from "../components/UserProfileDetail";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { useProfile } from "../hooks/useProfile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <BreadCrumbs />
        <LoadingSpinner text="Memuat data profil..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <BreadCrumbs />
        <div className="bg-white p-6 mt-6 rounded-xl shadow-sm">
          <div className="text-center py-8">
            <p className="text-red-500 font-semibold">Error: {error}</p>
            <p className="text-gray-500 text-sm mt-2">
              Gagal memuat data profil. Silakan coba lagi nanti.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col">
        <BreadCrumbs />
        <div className="bg-white p-6 mt-6 rounded-xl shadow-sm">
          <div className="text-center py-8">
            <p className="text-gray-500">Data profil tidak ditemukan.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BreadCrumbs />

      <UserProfileDetail user={profile} />

      <div className={`${CARD_STYLES.ACTION} mt-5`}>
        <ActionButtons
          onCancel={() => navigate("/admin/ubah-password")}
          cancelText="Ubah Password"
          saveText="Ubah Profile"
          onSave={() => navigate("/admin/ubah-profile")}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
