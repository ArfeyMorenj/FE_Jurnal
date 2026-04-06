import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useHistory } from "./hooks/useHistory";
import { useHistoryForm } from "./hooks/useHistoryForm";

import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import TextArea from "../../../../components/common/TextArea";
import InputField from "../../../../components/common/InputField";
import ActionButtons from "../components/ActionButtons";
import RichTextEditor from "../../../../components/common/RichTextEditor";
import LoadingSpinner from "../../../../components/LoadingSpinner";

import { CARD_STYLES } from "../constants/tentangConstants";
import { SECTION_IDS } from "../../../../constants/sections";

const HistoryPage = () => {
  const navigate = useNavigate();

  const initialForm = useMemo(
    () => ({
      history_title: "",
      presentation_description: "",
      presentation_value: "",
      commitment_short_description: "",
      commitment_long_description: "",
    }),
    []
  );

  const { history, loading: loadingHistory } = useHistory(SECTION_IDS.TENTANG_KAMI);

  const {
    formData,
    setFormData,
    setErrors,
    errors,
    loading: submitting,
    submit,
  } = useHistoryForm(initialForm, history?.id || null);

  useEffect(() => {
    if (!history) return;

    setFormData({
      history_title: history.history_title ?? "",
      presentation_description: history.presentation_description ?? "",
      presentation_value:
        history.presentation_value != null
          ? String(history.presentation_value)
          : "",
      commitment_short_description: history.commitment_short_description ?? "",
      commitment_long_description: history.commitment_long_description ?? "",
    });
  }, [history, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const success = await submit();
    if (success) navigate("/admin/tentang");
  };

  const handleTableHistoryClick = () => {
    navigate("/admin/tentang/history/table");
  };

  if (loadingHistory) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <BreadCrumbs
          manual={[
            { label: "History Section", path: "#" },
          ]}
        />
      </div>

      {/* CARD 1 */}
      <div className={`${CARD_STYLES.MAIN} p-6`}>
        <div className="flex gap-4 items-center justify-between">
          <div>
            <h2 className="font-bold text-[15px]">Section History Tentang Kami</h2>
            <p className="text-gray-500 text-[12px]">
              Akan tampil di bawah section sponsor tentang kami.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-r from-[#E45E14] to-[#CA2323] flex items-center justify-center text-white font-bold">
              i
            </div>
            <div className="flex items-center">
              <p className="text-[12px] text-[#000000]/40">Klik kata</p>
              <button
                onClick={handleTableHistoryClick}
                className="mx-1 text-[12px] font-bold text-transparent bg-gradient-to-b from-[#E45E14] to-[#CA2323] bg-clip-text hover:opacity-80 transition-opacity cursor-pointer"
              >
                Table History
              </button>
              <p className="text-[12px] text-[#000000]/40">
                untuk menuju section tabel history.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-[#D9D9D9]/80 my-6" />

        <InputField
          label="Judul Perjalanan"
          name="history_title"
          value={formData.history_title}
          onChange={handleChange}
          error={errors.history_title}
          placeholder="Masukkan judul perjalanan aplikasi"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Contoh: 'Perjalanan Kami' / 'Visi Perjalanan Kami'...
        </p>
      </div>

      {/* CARD 2 */}
      <div className={`${CARD_STYLES.MAIN} p-6 my-8`}>
        <h3 className="font-bold text-[15px]">Section Presentase</h3>
        <p className="text-[12px] text-gray-500">Akan tampil di bawah section sponsor.</p>
        <hr className="border-[#D9D9D9]/80 my-6" />

        <TextArea
          label="Deskripsi Singkat Presentase Aplikasi"
          name="presentation_description"
          value={formData.presentation_description}
          onChange={handleChange}
          error={errors.presentation_description}
          rows={3}
          required
        />

        <InputField
          label="Angka Presentase Aplikasi"
          name="presentation_value"
          value={formData.presentation_value}
          onChange={handleChange}
          error={errors.presentation_value}
          placeholder="contoh: 50"
          required
        />
      </div>

      {/* CARD 3 */}
      <div className={`${CARD_STYLES.MAIN} p-6 my-8`}>
        <h3 className="font-bold text-[15px]">Section Komitmen Aplikasi</h3>
        <p className="text-[12px] text-gray-500">Akan tampil di bawah sponsor.</p>
        <hr className="border-[#D9D9D9]/80 my-6" />

        <TextArea
          label="Deskripsi Singkat Komitmen"
          name="commitment_short_description"
          value={formData.commitment_short_description}
          onChange={handleChange}
          error={errors.commitment_short_description}
          rows={3}
          required
        />

        <RichTextEditor
          label="Deskripsi Utama & Tambahan"
          name="commitment_long_description"
          value={formData.commitment_long_description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              commitment_long_description: e.target.value,
            }))
          }
          error={errors.commitment_long_description}
          required
        />
      </div>

      <div className={`${CARD_STYLES.ACTION} mt-5`}>
        <ActionButtons
          onCancel={() => navigate(-1)}
          loading={submitting}
          onSave={handleSubmit}
        />
      </div>
    </div>
  );
};

export default HistoryPage;