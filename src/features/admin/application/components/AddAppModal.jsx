import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Icon as IconifyIcon } from "@iconify/react";
import FileInput from "../../../../components/common/FileInput";
import InputField from "../../../../components/common/InputField";
import TextareaField from "../../../../components/common/TextareaField";
import ColorPicker from "../../../../components/common/ColorPicker";
import Button from "../../../../components/common/Button";
import { validateAppForm, hasErrors } from "../utils/validation";

const AddAppModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        image: null,
        name: "",
        description: "",
        color1: "",
        color2: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleColorChange = (color, colorName) => {
        setFormData(prev => ({
            ...prev,
            [colorName]: color
        }));
        
        // Clear error when user changes color
        if (errors[colorName]) {
            setErrors(prev => ({
                ...prev,
                [colorName]: ""
            }));
        }
    };

    const handleFileChange = (e) => {
        // FileInput mengirim event custom dengan format { target: { name, value, error } }
        // Bukan event asli dari input file
        let file = null;
        
        // Cek apakah ini event asli dari input file atau event custom dari FileInput
        if (e.target?.files && e.target.files.length > 0) {
            // Event asli dari input file
            file = e.target.files[0];
        } else if (e.target?.value !== undefined) {
            // Event custom dari FileInput (value bisa berupa File object atau null)
            file = e.target.value;
        }
        
        const error = e.target?.error;
        
        setFormData(prev => ({
            ...prev,
            image: file
        }));
        
        // Handle error dari FileInput
        if (error) {
            setErrors(prev => ({
                ...prev,
                image: error
            }));
        } else if (errors.image && file) {
            // Clear error jika file berhasil dipilih
            setErrors(prev => ({
                ...prev,
                image: ""
            }));
        }
    };

    const validateForm = () => validateAppForm(formData, { requireImage: true });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (hasErrors(newErrors)) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        // Prepare data for saving
        const appData = {
            ...formData,
            color: `${formData.color1} ~ ${formData.color2}`,
        };
        
        // Panggil onSave (bisa async)
        try {
            await onSave(appData);
            
            // Reset form hanya jika onSave berhasil
            setFormData({
                image: null,
                name: "",
                description: "",
                color1: "",
                color2: ""
            });
            setErrors({});
            onClose();
        } catch (error) {
            // Error sudah dihandle di parent component
            console.error('Error in handleSubmit:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            image: null,
            name: "",
            description: "",
            color1: "",
            color2: ""
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-gray-900/30">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center gap-3 p-6 border-b border-gray-200">
                    <div className="w-10 h-10 bg-[#AA494E] rounded-lg flex items-center justify-center">
                        <IconifyIcon icon="ri:apps-2-ai-fill" className="text-white text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Tambah Aplikasi</h2>
                        <p className="text-sm text-gray-600">
                            Tambah aplikasi-aplikasi yang ingin Anda tampilkan di halaman daftar aplikasi
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Gambar Aplikasi */}
                    <FileInput
                        label="Gambar Aplikasi"
                        name="image"
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                        error={errors.image}
                    />

                    {/* Nama Aplikasi */}
                    <InputField
                        label="Nama Aplikasi"
                        name="name"
                        placeholder="Masukkan nama aplikasi Anda"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        error={errors.name}
                    />

                    {/* Deskripsi Aplikasi */}
                    <TextareaField
                        label="Deskripsi Aplikasi"
                        name="description"
                        placeholder="Masukkan deskripsi aplikasi Anda"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        error={errors.description}
                        rows={4}
                    />

                    {/* Warna Gradient */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Warna Gradient Tombol & Background Gambar <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <ColorPicker
                                    label="Warna Pertama"
                                    name="color1"
                                    color={formData.color1}
                                    setColor={(color) => handleColorChange(color, 'color1')}
                                    required
                                />
                                {errors.color1 && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                                        {errors.color1}
                                    </p>
                                )}
                            </div>
                            <span className="text-gray-500 font-medium">~</span>
                            <div className="flex-1">
                                <ColorPicker
                                    label="Warna Kedua"
                                    name="color2"
                                    color={formData.color2}
                                    setColor={(color) => handleColorChange(color, 'color2')}
                                    required
                                />
                                {errors.color2 && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                                        {errors.color2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleClose}
                            className="bg-[#8B8B8B] text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#AA494E] text-white px-6 py-2 rounded-lg hover:bg-[#B01E1E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Tambah'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAppModal;
