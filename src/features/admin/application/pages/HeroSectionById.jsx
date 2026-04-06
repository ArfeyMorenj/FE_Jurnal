import { useParams } from "react-router-dom"
import BreadCrumbs from "../../../../components/common/BreadCrumbs"
import InfoBar from "../../../../components/common/InfoBar"
import FileInput from "../../../../components/common/FileInput"
import InputField from "../../../../components/common/InputField"
import TextareaField from "../../../../components/common/TextareaField" 
import Button from "../../../../components/common/Button"
import LoadingSpinner from "../../../../components/LoadingSpinner"
import { useHeroSectionForm } from "../hooks/useHeroSectionForm"

const HeroSection = () => {
    const { sectionId } = useParams()
    
    const {
        formData,
        formErrors,
        isSubmitting,
        isLoading,
        error,
        heroData,
        isEditMode, 
        handleInputChange,
        handleFileChange,
        handleSubmit,
        handleBack,
    } = useHeroSectionForm(sectionId) 

    if (isLoading && !heroData) {
        return (
            <div className="min-h-screen">
                <LoadingSpinner text="Memuat data hero section..." />
            </div>
        )
    }

    if (!sectionId) {
        return (
            <div className="min-h-screen">
                <div className='mb-6'>
                    <BreadCrumbs manual={[
                        { label: "Hero Section", path: "/admin/aplikasi/hero-section" }
                    ]} />
                </div>
                <div className="bg-white p-5 rounded-xl mt-6">
                    <div className="text-center py-10">
                        <p className="text-red-500 text-lg">Section ID tidak ditemukan</p>
                        <Button
                            className="bg-[#8B8B8B] text-white rounded-xl mt-4"
                            onClick={handleBack}
                        >
                            Kembali
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
        <div className="min-h-screen">
            <div className='mb-6'>
                <BreadCrumbs manual={[
                    { label: "Hero Section", path: "/admin/aplikasi/hero-section" }
                ]} />
            </div>

            <InfoBar 
                message={
                    isEditMode
                        ? "Edit hero section untuk halaman aplikasi Anda."
                        : "Buat hero section baru untuk halaman aplikasi Anda."
                }
            />

            <div className="bg-white p-5 rounded-xl mt-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[15px] font-bold text-[#000405]">Hero Section</p>
                        <p className="text-[12px] text-[#000405]/60">
                            Akan tampil di bagian paling atas halaman daftar aplikasi.
                        </p>
                    </div>
                </div>
                
                <hr className="border-[#D9D9D9]/80 my-6"/>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <FileInput
                        label="Gambar Hero"
                        name="image"
                        required={!isEditMode}
                        accept="image/*"
                        onChange={handleFileChange}
                        error={formErrors.image}
                        value={formData.image || (isEditMode && heroData?.image ? heroData.image : null)}
                        showPreview={true}
                        note="Format: PNG, JPG, JPEG. Maksimal 2MB"
                    />
                
                    <InputField 
                        label="Masukkan Headline" 
                        placeholder="Masukkan Headline Landing Page" 
                        name="title" 
                        required 
                        value={formData.title}
                        onChange={handleInputChange}
                        error={formErrors.title}
                    />

                    <TextareaField 
                        label="Deskripsi" 
                        placeholder="Masukkan subheadline sebagai pendukung headline yang Anda buat" 
                        name="description" 
                        required 
                        value={formData.description}
                        onChange={handleInputChange}
                        error={formErrors.description}
                    />

                    <InputField 
                        label="Label Tombol CTA" 
                        placeholder="Masukkan label untuk tombol CTA" 
                        name="button_text" 
                        required 
                        value={formData.button_text}
                        onChange={handleInputChange}
                        error={formErrors.button_text}
                    />

                    <InputField 
                        label="Link Tombol CTA" 
                        placeholder="Masukkan link untuk tombol CTA" 
                        name="button_link" 
                        type="url"
                        required 
                        value={formData.button_link}
                        onChange={handleInputChange}
                        error={formErrors.button_link}
                    />
                    
                    <div className="bg-white p-5 rounded-xl mt-6 text-white flex items-center justify-end">
                        <Button 
                            type="button"
                            className="bg-[#8B8B8B] rounded-xl mx-3 my-2" 
                            onClick={handleBack}
                            disabled={isSubmitting}
                        >
                            Kembali
                        </Button>
                        <Button 
                            type="submit"
                            className="bg-[#AA494E] rounded-xl mx-3 my-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting 
                                ? (isEditMode ? "Menyimpan..." : "Membuat...") 
                                : (isEditMode ? "Simpan Perubahan" : "Buat Hero Section")
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default HeroSection