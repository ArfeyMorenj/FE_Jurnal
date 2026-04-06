import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import TextArea from "../../../../components/common/TextArea";
import FileInput from "../../../../components/common/FileInput";
import ActionButtons from "../components/ActionButtons";
import { CARD_STYLES } from "../constants/tentangConstants";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import { useSponsorSection } from "./hooks/useSponsorSection";
import { useSponsorForm } from "./hooks/useSponsorForm";
import { SECTION_IDS } from "../../../../constants/sections";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const SponsorPage = () => {
  const navigate = useNavigate();
  const sectionId = SECTION_IDS.TENTANG_KAMI;

  const { fetchData, sponsorId, loading, createSponsor, updateSponsor } =
    useSponsorSection(sectionId);

  const {
    form,
    errors,
    setDescription,
    setImageFile,
    addImage,
    removeImage,
    clearImage,
    setFromApi,
    validate,
    buildPayload,
  } = useSponsorForm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchData();
        if (res) setFromApi(res);
      } catch (_) {}
    };
    loadData();
  }, []); // eslint-disable-line

  const submitAndBack = async () => {
    if (!validate()) return;

    try {
      const payload = buildPayload();
      const ok = sponsorId
        ? await updateSponsor(payload)
        : await createSponsor(payload);

      if (ok) navigate('/admin/tentang');
    } catch (_) {}
  };

  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="min-h-screen relative">
      <div className="mb-6">
        <BreadCrumbs
          manual={[
            { label: "Section Sponsor", path: "/admin/sponsor" },
          ]}
        />
      </div>

      <div className={`${CARD_STYLES.MAIN} p-6`}>
        <TextArea
          label="Deskripsi Singkat Halaman Sponsor"
          value={form.description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <div className="mb-6 space-y-4">
          {form.images.map((item, index) => (
            <div key={item.id || index} className="relative">
              <FileInput
                label={`Gambar Sponsor ${index + 1}`}
                value={item.file || item.preview}
                onChange={(e) => setImageFile(index, e)}
                error={errors[`images.${index}`] || (index === 0 && errors.images)}
              />

              {(index > 0 || form.images.length > 1) && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-7.5 right-12 hover:scale-110 transition-transform"
                  title="Hapus gambar"
                >
                  <IoRemoveCircleOutline className="h-5 w-5 text-primary-red" />
                </button>
              )}

              {index === form.images.length - 1 && (
                <button
                  type="button"
                  onClick={addImage}
                  className="absolute top-7.5 right-4 hover:scale-110 transition-transform"
                  title="Tambah gambar"
                >
                  <IoAddCircleOutline className="h-5 w-5 text-primary-red" />
                </button>
              )}
            </div>
          ))}
        </div>

        {errors.images && !Object.keys(errors).some(key => key.startsWith('images.')) && (
          <p className="text-red-500 text-sm mt-2">{errors.images}</p>
        )}
      </div>

      <div className={`${CARD_STYLES.ACTION} mt-6`}>
        <ActionButtons
          onSave={submitAndBack}
          onCancel={() => navigate(-1)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SponsorPage;
