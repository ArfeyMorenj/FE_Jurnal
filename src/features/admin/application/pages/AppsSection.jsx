import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/Pagination";
import { CirclePlus, Eye, PencilLine, Trash2 } from "lucide-react";
import Button from "../../../../components/common/Button";
import ActionButton from "../../../../components/common/ActionButton";
import AddAppModal from "../components/AddAppModal";
import EditAppModal from "../components/EditAppModal";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import { useAppsSectionPage } from "../hooks/useAppsSectionPage";

const AppsSectionPage = () => {
    const {
        // State
        apps,
        isLoading,
        error,
        pagination,
        searchTerm,
        isAddModalOpen,
        isEditModalOpen,
        selectedAppData,
        isSaving,
        
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
    } = useAppsSectionPage();

    return (
        <>
        <div className="min-h-screen">
            <div className="flex items-center justify-between">
            <BreadCrumbs manual={[
            { label: "Apps Section", path: "/admin/aplikasi/AppsSection" }
        ]}
            />
                <Button 
                    leftIcon={<CirclePlus size={16}/>} 
                    className="bg-[#AA494E] text-white rounded-xl"
                    onClick={handleAddApp}
                >
                Tambah Aplikasi
                </Button>
            </div>
            <div className="bg-white rounded-xl p-6 mt-8">
                <SearchInput 
                    placeholder="Telusuri sesuatu..."
                    className="w-full max-w-md"
                    value={searchTerm}
                    onSearch={(value) => setSearchTerm(value)}
                    onClear={() => setSearchTerm('')}
                />
                <hr className="border-[#D9D9D9]/80 my-6" />
                
                {/* Table */}
                <div className="overflow-x-auto rounded-xl min-h-[200px]">
                    {isLoading ? (
                        <div className="py-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#AA494E]" />
                            <p className="mt-4 text-gray-600">Memuat data aplikasi...</p>
                        </div>
                    ) : error ? (
                        <div className="py-12 text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button className="bg-[#AA494E] text-white rounded-lg px-4 py-2" onClick={refresh}>
                                Coba Lagi
                            </Button>
                        </div>
                    ) : apps.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            Belum ada data aplikasi.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#AA494E] text-white">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Gambar</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Nama Aplikasi</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Deskripsi</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Lead & Status</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apps.map((app) => (
                                    <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <div className="relative w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                                <img 
                                                    src={app.image} 
                                                    alt={app.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="font-medium text-gray-900">{app.name}</div>
                                            <p className="text-xs text-gray-500">{app.section?.title || '-'}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-600 max-w-xs">
                                                {app.description || "Tidak ada deskripsi"}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-700">
                                                <span className="block text-xs text-gray-500">Lead-in</span>
                                                {app.leadInText || "-"}
                                            </div>
                                            <div className="text-sm text-gray-700 mt-2">
                                                <span className="block text-xs text-gray-500">Status</span>
                                                <span className={app.isActive ? "text-green-600" : "text-gray-500"}>
                                                    {app.isActive ? "Aktif" : "Nonaktif"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <ActionButton 
                                                    icon={Eye}
                                                    onClick={() => handleView(app.id)}
                                                    color="#3B82F6"
                                                    hoverBg="#EFF6FF"
                                                />
                                                <ActionButton 
                                                    icon={PencilLine}
                                                    onClick={() => handleEdit(app.id)}
                                                    color="#F0A206"
                                                    hoverBg="#EFF6FF"
                                                />
                                                <ActionButton 
                                                    icon={Trash2}
                                                    onClick={() => handleDelete(app.id)}
                                                    color="#CA2323"
                                                    hoverBg="#EFF6FF"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination Info & Controls */}
                <div className="flex items-center justify-end md:justify-between mt-6">
                    <div className="hidden md:block text-sm text-gray-600">
                        Menampilkan {apps.length} data
                </div>

                {/* Pagination — selalu tampil */}
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.lastPage}
                    onPageChange={setPage}
                />
                </div>
            </div>
            <div className="bg-white rounded-xl mt-4 p-3 text-white flex items-center justify-end gap-3">
                <Button className="bg-[#8B8B8B] rounded-xl" onClick={handleBack}>
                    Kembali
                </Button>
            </div>
        </div>

        {/* Add App Modal */}
        <AddAppModal
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSave={handleSaveApp}
        />

        {/* Edit App Modal */}
        <EditAppModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onSave={handleUpdateApp}
            appData={selectedAppData}
        />

        {/* Delete Confirm Modal */}
        <DeleteConfirmModal />
        </>
    )
}

export default AppsSectionPage
