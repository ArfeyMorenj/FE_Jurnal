import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useApplicationIdBySlug } from "../hooks/useApplicationIdBySlug";
import FaqSectionPage from "../../beranda/pages/FaqSectionPage";

/**
 * Wrapper component untuk FAQ Section yang menggunakan slug
 * Mengkonversi slug ke ID aplikasi, lalu render FaqSectionPage
 */
const ApplicationFaqBySlug = () => {
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

  // Render FaqSectionPage
  // Note: Untuk sekarang menggunakan FaqSectionPage global
  // Jika nanti perlu FAQ per aplikasi, bisa dimodifikasi dengan memodifikasi hook useFaqs
  return <FaqSectionPage />;
};

export default ApplicationFaqBySlug;
// di sini cuma kaya warpper gitu, misal di sidebar apk kita klik FAq nya tetep /slug aplikasi/faq
