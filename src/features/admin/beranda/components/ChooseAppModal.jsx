import { useEffect, useState } from "react";
import ModalWrapper from "../../../../components/ModalWrapper";
import SelectField from "../../../../components/common/SelectField";

export default function ChooseAppModal({
  isOpen,
  onClose,
  onConfirm,
  options = [],
  defaultValue = "",
}) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue, isOpen]);

  const handleConfirm = () => {
    if (!selected) return;
    onConfirm(selected);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      icon="ri:apps-2-ai-fill"
      iconBg="#AA494E"
      title="Pilih Aplikasi"
      description="Pilih (maksimal 3) aplikasi dari daftar aplikasi untuk ditampilkan di beranda landing page"
      confirmText="Tambah"
      confirmColor="bg-[#AA494E]"
      cancelColor="bg-[#8B8B8B]"
      onConfirm={handleConfirm}
    >
      <SelectField
        label="Pilih Aplikasi"
        required
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        placeholder="Pilih aplikasi yang ingin ditampilkan"
        options={options}
      />
    </ModalWrapper>
  );
}
