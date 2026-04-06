import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import ActionButton from "../../../../../components/common/ActionButton";
import { FaEye } from "react-icons/fa6";
import { Trash2 } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import Pagination from "../../../../../components/Pagination";
import { useDeleteModal } from "../../../../../store/useDeleteModal";
import DeleteConfirmModal from "../../../../../components/DeleteConfirmModal";
import SearchInput from "../../../../../components/common/SearchInput";
import usePremium from "../controller/usePremium";

export default function PremiumPage() {
  const navigate = useNavigate();
  const { openDeleteModal } = useDeleteModal();

  const {
    premiumData,
    loading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalData,
    searchTerm,
    setSearchTerm,
    deletePremium,
  } = usePremium();

  const onView = (id) => navigate(`/admin/premium/detail/${id}`);
  const onEdit = (id) => navigate(`/admin/premium/edit/${id}`);
  const onCreate = () => navigate("/admin/premium/create-premium");
  const onBack = () => navigate("/admin/dashboard");

  const onDelete = (item) => {
    openDeleteModal(item.id, async () => {
      try {
        await deletePremium(item.id);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const startItem = totalData > 0 ? (currentPage - 1) * itemsPerPage + 1 : 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalData);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <BreadCrumbs />
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-[#AA494E] text-white rounded-lg hover:opacity-90 transition"
        >
          + Buat Paket
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="mb-6 w-full md:w-1/3">
          <SearchInput
            placeholder="Telusuri paket..."
            value={searchTerm}
            onSearch={setSearchTerm}
            onClear={() => setSearchTerm("")}
            focusColor="red"
          />
        </div>

        <DataTable
          columns={[
            { label: "No", className: "w-20" },
            { label: "Nama Paket" },
            { label: "Harga" },
            { label: "Masa Berlaku" },
            { label: "Aksi", className: "w-36 text-center" },
          ]}
          data={premiumData}
          isLoading={loading}
          emptyText="Data paket premium tidak tersedia."
          renderRow={(item, i) => (
            <tr key={item.id} 
                className="hover:bg-gray-50 transition border border-[#D9D9D9] text-[#606060] inter text-[13px]">
              <td className="p-3">{startItem + i}</td>
              <td className="p-3">{item.nama}</td>
              <td className="p-3">
                Rp. {Number(item.harga).toLocaleString("id-ID")}
              </td>
              <td className="p-3">{item.masa}</td>
              <td className="p-3 text-center flex justify-center gap-2">
                <ActionButton
                  icon={FaEye}
                  color="#2B71EB"
                  hoverBg="#E7F0FF"
                  onClick={() => onView(item.id)}
                />
                <ActionButton
                  icon={HiPencil}
                  color="#F1A500"
                  hoverBg="#FFF5E5"
                  onClick={() => onEdit(item.id)}
                />
                <ActionButton
                  icon={Trash2}
                  color="#D22027"
                  hoverBg="#FFE5E5"
                  onClick={() => onDelete(item)}
                />
              </td>
            </tr>
          )}
        />

        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Menampilkan {startItem}-{endItem} dari {totalData} data
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(totalData / itemsPerPage))}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 flex justify-end">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-[#8B8B8B] text-white hover:bg-gray-300 rounded-lg transition"
        >
          Kembali
        </button>
      </div>

      <DeleteConfirmModal />
    </div>
  );
}