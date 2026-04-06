import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../../components/FormSectionWrapper";
import InputField from "../../../../../components/common/InputField";
import SelectField from "../../../../../components/common/SelectField";
import RichTextEditor from "../../../../../components/common/RichTextEditor";
import Button from "../../../../../components/common/Button";
import { masaOptions } from "../constans/masaOptions";
import { usePremiumForm } from "../hooks/usePremiumForm";
import usePremium from "../controller/usePremium";

export default function CreatePremiumPage() {
  const navigate = useNavigate();
  const { createPremium } = usePremium();
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleContentChange,
    handleSubmit
  } = usePremiumForm({
    onSubmit: async (payload) => {
      const formattedPayload = {
        name: payload.nama,
        price: payload.harga,
        duration: payload.masa,
        description: payload.keterangan,
        benefits: payload.benefit,
      };

      await createPremium(formattedPayload);
      navigate("/admin/premium");
    }
  });


  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 md:px-0">
      <BreadCrumbs manual={[{ label: "Tambah Paket Premium" }]} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FormSectionWrapper
          title="Tambah Paket Premium"
          description="Tambah paket premium yang ingin ditampilkan."
        >
          <InputField
            label="Nama Paket"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama paket"
            required
            error={errors.nama}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Harga Paket"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              placeholder="Masukkan harga paket"
              required
              error={errors.harga}
            />
            <SelectField
              label="Masa Berlaku"
              name="masa"
              value={formData.masa}
              onChange={(e) => handleSelectChange("masa", e.target.value)}
              options={masaOptions}
              required
              error={errors.masa}
            />
          </div>

          <RichTextEditor
            label="Keterangan Paket"
            name="keterangan"
            value={formData.keterangan}
            onChange={(value) => handleContentChange("keterangan", value)} 
            placeholder="Masukkan keterangan paket"
            height="150px"
            error={errors.keterangan}
          />

          <RichTextEditor
            label="Benefit Paket"
            name="benefit"
            value={formData.benefit}
            onChange={(value) => handleContentChange("benefit", value)}
            placeholder="Masukkan benefit paket"
            height="150px"
            error={errors.benefit}
          />
        </FormSectionWrapper>

        <div className="flex justify-center sm:justify-end items-center gap-3 p-5 bg-white rounded-[10px]">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-[#8B8B8B] text-white font-bold rounded-lg hover:bg-gray-500"
          >
            Kembali
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#AA494E] text-white font-bold rounded-lg hover:bg-[#B21E1E] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}