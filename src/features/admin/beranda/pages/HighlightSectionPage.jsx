import React from 'react'
import FormSectionWrapper from '../../../../components/FormSectionWrapper'
import InputField from '../../../../components/common/InputField'
import TextareaField from '../../../../components/common/TextareaField'
import BreadCrumbs from '../../../../components/common/BreadCrumbs'
import HighlightTable from '../components/HighlightTable'
import Button from '../../../../components/common/Button'
import DeleteConfirmModal from '../../../../components/DeleteConfirmModal'
import { useHighlightForm } from '../hooks/useHighlightForm'
import { useNavigate } from 'react-router-dom'

const HighlightSectionPage = () => {
  const navigate = useNavigate();
  const { 
    highlightForm, 
    handleChange, 
    handleSubmit, 
    loading, 
    updateRow,
    updateRowArray,
    deletePoint,
    errors
  } = useHighlightForm();

  const onSubmit = async () => {
    const success = await handleSubmit(); 
    if (success) {
      navigate("/admin/beranda"); 
    }
  };

  return (
    <div className='flex flex-col gap-6 max-w-7xl'>
        <BreadCrumbs manual={[{ label: "Highlight Section" }]} />

        <FormSectionWrapper
            title="Highlight"
            description="Jelaskan apa yang menjadi highlight / sorotan aplikasi-aplikasi yang ada di MiJurnal."
        >
            <InputField
                label="Masukkan Judul Section"
                name="judul_section"
                placeholder="Masukkan judul section landing page"
                value={highlightForm.judul_section}
                onChange={handleChange}
                required
                error={errors?.judul_section}
            />

            <TextareaField
                label="Masukkan Deskripsi"
                name="deskripsi"
                placeholder="Masukkan deskripsi sebagai pendukung judul yang Anda buat"
                value={highlightForm.deskripsi}
                onChange={handleChange}
                inputStyle='!mb-0'
                required
                error={errors?.deskripsi}
            />
        </FormSectionWrapper>

        <FormSectionWrapper
            title="List Point Highlight Section"
            description="Kustomisasi point yang menjadi highlight untuk aplikasi-aplikasi yang ada di MiJurnal."
        >
            <HighlightTable 
            rows={highlightForm.rows} 
            updateRow={updateRow}
            updateRowArray={updateRowArray}
            deletePoint={deletePoint}
            errors={errors?.rows}
            />
        </FormSectionWrapper>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white rounded-[10px] gap-3">
            <p className="text-[13px] font-medium inter text-[#8B8B8B] text-left">
            Maksimal Point Highlight: 4 Point
            </p>

            <div className="flex gap-3 self-end sm:self-auto">
                <Button
                    onClick={() => navigate(-1)}
                    className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg hover:bg-gray-500 text-white"
                >
                    Kembali
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={loading}
                    className={`bg-[#AA494E] text-[13px] font-bold rounded-lg text-white ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#B21E1E]"
                    }`}
                >
                    {loading ? "Menyimpan..." : "Simpan"}
                </Button>
            </div>
        </div>
        <DeleteConfirmModal />
    </div>
  )
}

export default HighlightSectionPage
