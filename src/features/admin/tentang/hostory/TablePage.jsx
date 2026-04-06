import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import HistoryTable from "./components/HistoryTable";
import HistoryModalCreate from "./components/HistoryModalCreate";
import HistoryModalEdit from "./components/HistoryModaEdit";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import InfoSection from "./components/InfoSection";
import ActionButtons from "../components/ActionButtons";
import { useHistoryManager } from "./hooks/useTableManager";
import { SECTION_IDS } from "../../../../constants/sections";
import { CARD_STYLES } from "../constants/tentangConstants";
import { useDeleteModal } from "../../../../store/useDeleteModal";

const SECTION_ID = SECTION_IDS.TENTANG_KAMI;

const TablePage = () => {
  const navigate = useNavigate();

  const {
    list,
    serverList,
    loading,
    submitting,
    hasChanges,
    modals,
    editingItem,
    onCreate,
    onEdit,
    onDelete,
    onSaveDrafts,
    formErrors
  } = useHistoryManager(SECTION_ID);

  const handleCancel = () => {
    if (hasChanges) {
      const confirmed = window.confirm(
        "Ada draft yang belum disimpan. Yakin ingin membatalkan?"
      );
      if (!confirmed) return;
    }
    navigate(-1);
  };

  const { openDeleteModal } = useDeleteModal();
  return (
    <div>
      <BreadCrumbs
        manual={[
          { label: "History Section", path: "/admin/tentang/history" },
          { label: "Table History" },
        ]}
      />

      <InfoSection onAddClick={modals.create.open} />

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <HistoryTable
          items={list}
          onEdit={modals.edit.open}
          onDelete={(item, index) =>
            openDeleteModal(null, () => onDelete(item, index))
          }
          serverCount={serverList.length}
        />
      )}

      <div className={`${CARD_STYLES.ACTION} mt-5`}>
        <ActionButtons
          onCancel={handleCancel}
          loading={submitting}
          onSave={onSaveDrafts}
          disabled={!hasChanges}
        />
      </div>

      <HistoryModalCreate
        isOpen={modals.create.isOpen}
        onClose={modals.create.close}
        onSubmit={onCreate}
        errors={formErrors}
      />

      <HistoryModalEdit
        isOpen={modals.edit.isOpen}
        initialData={editingItem}
        onClose={modals.edit.close}
        onSubmit={onEdit}
        errors={formErrors}
      />

      <DeleteConfirmModal/>
    </div>
  );
};

export default TablePage;