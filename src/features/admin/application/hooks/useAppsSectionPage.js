import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../services/useApplications";
import { 
  createApplication, 
  getApplicationById, 
  updateApplication, 
  deleteApplication 
} from "../services/appsService";
import { Toasts } from "../../../../utils/Toast";
import { useDeleteModal } from "../../../../store/useDeleteModal";

/**
 * Custom hook for managing Apps Section page
 */
export const useAppsSectionPage = () => {
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [selectedAppData, setSelectedAppData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingAppData, setIsLoadingAppData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const { apps, isLoading, error, pagination, refresh, setPage } = useApplications(1, searchTerm);
    const { openDeleteModal } = useDeleteModal();

    const handleAddApp = () => {
        setIsAddModalOpen(true);
    };

    const handleEdit = async (appId) => {
        const app = apps.find(a => a.id === appId);
        const sectionId = app?.section?.id;
        
        if (!sectionId) {
            Toasts('error', 3000, 'Gagal', 'Section ID tidak ditemukan untuk aplikasi ini');
            return;
        }

        setSelectedAppId(appId);
        setSelectedSectionId(sectionId);
        setIsLoadingAppData(true);
        
        try {
            const result = await getApplicationById(sectionId, appId);
            
            if (result.application) {
                setSelectedAppData(result.application);
                setIsEditModalOpen(true);
            } else {
                Toasts('error', 3000, 'Gagal', 'Tidak dapat memuat data aplikasi');
            }
        } catch (error) {
            console.error('Error fetching application:', error);
            Toasts('error', 3000, 'Gagal', error.message || 'Gagal memuat data aplikasi');
        } finally {
            setIsLoadingAppData(false);
        }
    };

   
    const handleView = (appId) => {
        const app = apps.find(a => a.id === appId);
        const sectionId = app?.section?.id;

        navigate(`/admin/aplikasi/detail/${appId}`, {
            state: {
            sectionId,
            applicationName: app?.name
            }
        });
    };

    const handleDelete = (appId) => {
        const app = apps.find(a => a.id === appId);
        const sectionId = app?.section?.id;
        
        if (!sectionId) {
            Toasts('error', 3000, 'Gagal', 'Section ID tidak ditemukan untuk aplikasi ini');
            return;
        }
        
        setSelectedAppId(appId);
        setSelectedSectionId(sectionId);
        
        openDeleteModal(appId, async () => {
            if (!appId || !sectionId) {
                Toasts('error', 3000, 'Gagal', 'Data tidak valid');
                return false;
            }

            setIsDeleting(true);
            try {
                await deleteApplication(sectionId, appId);
                Toasts('success', 3000, 'Berhasil', 'Aplikasi dan section berhasil dihapus');
                await refresh();
                setSelectedAppId(null);
                setSelectedSectionId(null);
                return true;
            } catch (error) {
                console.error('Error deleting application:', error);
                Toasts('error', 3000, 'Gagal', error.message || 'Gagal menghapus aplikasi');
                return false;
            } finally {
                setIsDeleting(false);
            }
        });
    };

    const handleBack = () => {
        navigate("/admin/aplikasi");
    };

    const prepareFormData = (appData) => {
        const formData = new FormData();
        
        if (appData.image instanceof File) {
            formData.append('image', appData.image);
        }
        
        formData.append('name', appData.name.trim());
        formData.append('description', appData.description.trim());
        formData.append('lead_in_text', appData.name.trim());
        
        if (appData.color) {
            const colors = appData.color.split(' ~ ');
            if (colors.length === 2) {
                formData.append('text_color', colors[0].trim());
                formData.append('color_gradient_start', colors[0].trim());
                formData.append('color_gradient_end', colors[1].trim());
            }
        } else if (appData.color1 && appData.color2) {
            formData.append('text_color', appData.color1.trim());
            formData.append('color_gradient_start', appData.color1.trim());
            formData.append('color_gradient_end', appData.color2.trim());
        } else if (appData.color1) {
            formData.append('text_color', appData.color1.trim());
            formData.append('color_gradient_start', appData.color1.trim());
            formData.append('color_gradient_end', appData.color1.trim());
        } else {
            throw new Error('Warna harus diisi');
        }
        
        return formData;
    };

    // CREATE: Service akan create section dulu, dapat ID, baru create app
     
    const handleSaveApp = async (appData) => {
        setIsSaving(true);
        try {
            if (!(appData.image instanceof File)) {
                throw new Error('Gambar aplikasi harus diisi');
            }

            const formData = prepareFormData(appData);
            formData.append('is_active', '1');
            
            const result = await createApplication(formData);
            
            if (result.application) {
                Toasts('success', 3000, 'Berhasil', 'Aplikasi dan section berhasil ditambahkan');
                setIsAddModalOpen(false);
                await refresh();
            } else {
                throw new Error('Gagal membuat aplikasi');
            }
        } catch (error) {
            console.error('Error saving application:', error);
            Toasts('error', 3000, 'Gagal', error.message || 'Gagal menambahkan aplikasi');
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateApp = async (appData) => {
        if (!selectedAppId || !selectedSectionId) {
            Toasts('error', 3000, 'Gagal', 'Data aplikasi tidak valid');
            return;
        }
        
        setIsSaving(true);
        try {
            const formData = prepareFormData(appData);
            formData.append('is_active', appData.isActive ? '1' : '0');
            
            const result = await updateApplication(selectedSectionId, selectedAppId, formData);
            
            if (result.application) {
                Toasts('success', 3000, 'Berhasil', 'Aplikasi berhasil diperbarui');
                setIsEditModalOpen(false);
                setSelectedAppId(null);
                setSelectedSectionId(null);
                setSelectedAppData(null);
                await refresh();
            } else {
                throw new Error('Gagal memperbarui aplikasi');
            }
        } catch (error) {
            console.error('Error updating application:', error);
            Toasts('error', 3000, 'Gagal', error.message || 'Gagal memperbarui aplikasi');
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAppId(null);
        setSelectedSectionId(null);
        setSelectedAppData(null);
    };

    return {
        // State
        apps,
        isLoading,
        error,
        pagination,
        searchTerm,
        isAddModalOpen,
        isEditModalOpen,
        selectedAppId,
        selectedAppData,
        isSaving,
        isLoadingAppData,
        isDeleting,
        
        // Handlers
        handleAddApp,
        handleEdit,
        handleView,
        handleDelete,
        handleBack,
        handleSaveApp,
        handleUpdateApp,
        closeAddModal,
        closeEditModal,
        setSearchTerm,
        setPage,
        refresh,
    };
};