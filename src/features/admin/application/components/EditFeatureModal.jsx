import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Icon as IconifyIcon } from "@iconify/react";
import FileInput from "../../../../components/common/FileInput";
import InputField from "../../../../components/common/InputField";
import TextareaField from "../../../../components/common/TextareaField";
import ColorPicker from "../../../../components/common/ColorPicker";
import Button from "../../../../components/common/Button";
import { validateFeatureForm } from "../helper/featureValidate";

const EditFeatureModal = ({
  isOpen,
  onClose,
  feature,
  onSave,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    featureImage: null,
    iconImage: null,
    name: "",
    description: "",
    gradientFrom: "",
    gradientTo: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!feature) return;
    setFormData({
      featureImage: feature.featureImage || null,
      iconImage: feature.iconImage || null,
      name: feature.name || "",
      description: feature.description || "",
      gradientFrom: feature.colorGradientStart || "",
      gradientTo: feature.colorGradientEnd || "",
    });
    setErrors({});
  }, [feature, isOpen]);

  if (!isOpen || !feature) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, value, error } = e.target;

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleColorChange = (color, colorName) => {
    setFormData((prev) => ({
      ...prev,
      [colorName]: color,
    }));

    if (errors[colorName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[colorName];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFeatureForm({
      name: formData.name,
      description: formData.description,
      gradientFrom: formData.gradientFrom,
      gradientTo: formData.gradientTo,
      featureImage: formData.featureImage,
      iconImage: formData.iconImage,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-gray-900/30">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-[#AA494E] rounded-lg flex items-center justify-center">
            <IconifyIcon icon="ri:apps-2-ai-fill" className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Fitur</h2>
            <p className="text-sm text-gray-600">
              Perbarui informasi fitur aplikasi yang akan tampil di detail aplikasi.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileInput
              label="Gambar Fitur"
              name="featureImage"
              accept="image/*"
              onChange={handleFileChange}
              value={formData.featureImage}
              error={errors.featureImage}
            />
            <FileInput
              label="Gambar Icon Fitur"
              name="iconImage"
              accept="image/*"
              onChange={handleFileChange}
              value={formData.iconImage}
              error={errors.iconImage}
            />
          </div>

          <InputField
            label="Nama Fitur"
            name="name"
            placeholder="Masukkan nama fitur aplikasi Anda"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

  <TextareaField
            label="Deskripsi Fitur"
            name="description"
            placeholder="Masukkan deskripsi fitur"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            rows={4}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Warna Gradient Tombol & Background Gambar{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <ColorPicker
                  label="Warna Pertama"
                  name="gradientFrom"
                  color={formData.gradientFrom}
                  setColor={(color) => handleColorChange(color, "gradientFrom")}
                  required
                  error={errors.gradientFrom}
                />
              </div>
              <span className="text-gray-500 font-medium">~</span>
              <div className="flex-1">
                <ColorPicker
                  label="Warna Kedua"
                  name="gradientTo"
                  color={formData.gradientTo}
                  setColor={(color) => handleColorChange(color, "gradientTo")}
                  required
                  error={errors.gradientTo}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              className="bg-[#8B8B8B] text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#E45E14] text-white px-6 py-2 rounded-lg hover:bg-[#D14A0F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeatureModal;

