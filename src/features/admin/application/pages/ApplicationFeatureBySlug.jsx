import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useApplicationIdBySlug } from "../hooks/useApplicationIdBySlug";
import FeatureSection from "./featureSection";

/**
 * Wrapper component untuk Feature Section yang menggunakan slug
 * Mengkonversi slug ke ID aplikasi, lalu render FeatureSection
 */
const ApplicationFeatureBySlug = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { applicationId, isLoading, error } = useApplicationIdBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner text="Memuat data aplikasi..." />
      </div>
    );
  }

  if (error || !applicationId) {
    return (
      <div className="min-h-screen">
        <div className="bg-white p-5 rounded-xl m-6">
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">{error || "Aplikasi tidak ditemukan"}</p>
            <button
              onClick={() => navigate("/admin/aplikasi")}
              className="mt-4 px-4 py-2 bg-[#8B8B8B] text-white rounded-xl"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render FeatureSection dengan ID yang didapat dari slug
  // Kita perlu memodifikasi FeatureSection untuk menerima ID dari props atau menggunakan context
  // Untuk sementara, kita bisa menggunakan URL parameter dengan cara yang berbeda
  // Tapi lebih baik kita modifikasi sedikit agar bisa menggunakan ID dari state
  return <FeatureSectionWrapper applicationId={applicationId} />;
};

/**
 * Wrapper untuk FeatureSection yang menerima applicationId sebagai prop
 */
const FeatureSectionWrapper = ({ applicationId }) => {
  // Pass applicationId sebagai prop ke FeatureSection
  return <FeatureSection applicationId={applicationId} />;
};

export default ApplicationFeatureBySlug;

