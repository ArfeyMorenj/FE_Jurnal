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
      iconBg="#E45E14"
      title="Ganti Aplikasi"
      description="Ganti aplikasi yang ingin Anda tampilkan."
      confirmText="Ganti"
      confirmColor="bg-[#E45E14]"
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
