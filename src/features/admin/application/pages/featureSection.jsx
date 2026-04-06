import React from 'react';
import { useParams } from 'react-router-dom';
import { CirclePlus , Eye , Pencil , Trash2 } from 'lucide-react';
import Button from '../../../../components/common/Button';
import ActionButton from '../../../../components/common/ActionButton';
import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import DeleteConfirmModal from '../../../../components/DeleteConfirmModal';
import AddFeatureModal from '../components/AddFeatureModal';
import EditFeatureModal from '../components/EditFeatureModal';
import { useFeatureSectionPage } from '../hooks/useFeatureSectionPage';
import { useNavigate } from 'react-router-dom';

const FeatureSection = ({ applicationId: propApplicationId }) => {
    const { id: paramId } = useParams();
    const applicationId = propApplicationId || paramId;
    const navigate = useNavigate();
    const {
        features,
        isLoading,
        error,
        isAddOpen,
        isEditOpen,
        isSubmitting,
        isUpdating,
        selectedFeature,
        handleView,
        handleAddFeature,
        handleEdit,
        handleDelete,
        handleSaveFeature,
        handleUpdateFeature,
        closeAddModal,
        closeEditModal,
    } = useFeatureSectionPage(applicationId);

    const handleBack = () => {
        navigate(-1);
    }

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <BreadCrumbs 
                    manual={[
                        { label: "Feature Section" }
                    ]}
                />
                <div className="mt-6">
                    <LoadingSpinner text="Memuat data features..." />
                </div>
            </div>
        );
    }

    return (
        <>
        <div className="min-h-screen">
            {/* Breadcrumb */}
                <BreadCrumbs 
                    manual={[
                        { label: "Feature Section" }
                    ]}
                />

            {/* Main Content */}
            <div className='mt-6'>
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#D9D9D9]/80">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-[15px] font-bold">Feature Section</h1>
                                <p className="text-[#000405]/60 text-[12px]">Akan tampil di bagian bawah hero section detail aplikasi.</p>
                            </div>
                            <Button
                            onClick={handleAddFeature}
                            className="px-4 py-2 rounded-lg flex items-center gap-2 bg-white"
                            leftIcon={
                                <CirclePlus 
                                    size={16} 
                                    className="text-[#E45E14]"
                                />
                            }
                        >
                            <span className="bg-gradient-to-b from-[#CA2323] to-[#E45E14] bg-clip-text text-transparent font-medium">
                                Tambah Fitur Aplikasi
                            </span>
                        </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Table */}
                    <div className='px-6 py-4'>
                    <div className="overflow-x-auto rounded-xl min-h-[200px]">
                        <table className="w-full">
                            <thead className="bg-[#AA494E] text-white text-[12px]">
                                <tr>
                                    <th className="px-6 py-4 text-left font-medium">Gambar</th>
                                    <th className="px-6 py-4 text-left font-medium">Ikon Aplikasi</th>
                                    <th className="px-6 py-4 text-left font-medium">Nama Fitur</th>
                                    <th className="px-6 py-4 text-left font-medium">Deskripsi Fitur</th>
                                    <th className="px-6 py-4 text-left font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {features.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                            Tidak ada data features
                                        </td>
                                    </tr>
                                ) : (
                                    features.map((feature) => (
                                        <tr key={feature.id} className="hover:bg-gray-50">
                                            <td className="px-6">
                                                <div className="relative w-19 h-19 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                                    {feature.featureImage ? (
                                                        <img 
                                                            src={feature.featureImage} 
                                                            alt={feature.name} 
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 flex items-center justify-center text-gray-400 text-xs">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='relative w-19 h-19 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50'>
                                                    {feature.iconImage ? (
                                                        <img 
                                                            src={feature.iconImage} 
                                                            alt={feature.name} 
                                                            className="w-[60px] h-[60px] object-cover rounded-full"
                                                        />
                                                    ) : (
                                                        <div 
                                                            className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-xs"
                                                            style={{
                                                                background: feature.colorGradientStart && feature.colorGradientEnd
                                                                    ? `linear-gradient(to bottom, ${feature.colorGradientStart}, ${feature.colorGradientEnd})`
                                                                    : 'linear-gradient(to bottom, #CA2323, #E45E14)'
                                                            }}
                                                        >
                                                            {feature.name?.charAt(0) || 'F'}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {feature.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-md">
                                                {feature.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <ActionButton
                                                        onClick={() => handleEdit(feature)}
                                                        icon={Pencil}
                                                        color="#F59E0B"
                                                        hoverBg="#FFFBEB"
                                                    />
                                                    <ActionButton
                                                        onClick={() => handleDelete(feature.id)}
                                                        icon={Trash2}
                                                        color="#EF4444"
                                                        hoverBg="#FEF2F2"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    </div>

                    {/* Data Info */}
                    <div className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                            Menampilkan {features.length} data
                        </div>
                    </div>
                </div>
                <div className='bg-white w-full rounded-xl p-3 text-white flex items-center justify-end gap-3 mt-4'>
                    <Button className="bg-[#8B8B8B] rounded-xl" onClick={handleBack}>
                        Kembali
                    </Button>
                </div>
            </div>
        </div>
        {/* Add Feature Modal */}
        <AddFeatureModal
            isOpen={isAddOpen}
            onClose={closeAddModal}
            onSave={handleSaveFeature}
            isSubmitting={isSubmitting}
        />

        {/* Edit Feature Modal */}
        <EditFeatureModal
            isOpen={isEditOpen}
            onClose={closeEditModal}
            feature={selectedFeature}
            onSave={handleUpdateFeature}
            isSubmitting={isUpdating}
        />

        {/* Delete Confirm Modal */}
        <DeleteConfirmModal />
        </>
    );
};

export default FeatureSection;