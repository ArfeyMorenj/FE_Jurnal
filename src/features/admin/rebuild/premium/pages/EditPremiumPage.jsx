import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import FormSectionWrapper from "../../../../../components/FormSectionWrapper";
import InputField from "../../../../../components/common/InputField";
import SelectField from "../../../../../components/common/SelectField";
import RichTextEditor from "../../../../../components/common/RichTextEditor";
import Button from "../../../../../components/common/Button";
import usePremium from "../controller/usePremium";
import { masaOptions } from "../constans/masaOptions";
import { usePremiumForm } from "../hooks/usePremiumForm";

export default function EditPremiumPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPremiumById, updatePremium } = usePremium();
  const [initialData, setInitialData] = useState(null);
  
  useEffect(() => {
    if (id) {
      getPremiumById(id)
        .then((data) => {
          if (data) {
            setInitialData({
              nama: data.name || "",
              harga: data.price || "",
              masa: data.duration || "1 Bulan",
              keterangan: data.description || "",
              benefit: data.benefits || "",
            });
          }
        })
        .catch(() => {});
    }
  }, [id, getPremiumById]);

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleContentChange,
    handleSubmit
  } = usePremiumForm({
    initialData,
    onSubmit: async (data) => {
      await updatePremium(id, {
        name: data.nama,
        price: data.harga,
        duration: data.masa,
        description: data.keterangan,
        benefits: data.benefit,
      });

      navigate("/admin/premium");
    },
  });


  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 md:px-0">
      <BreadCrumbs manual={[{ label: "Edit Paket Premium" }]} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FormSectionWrapper
          title="Edit Paket Premium"
          description="Edit paket premium yang ingin ditampilkan."
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