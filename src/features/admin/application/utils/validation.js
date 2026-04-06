// Centralized validation helpers for application modals

export function validateAppForm(formData, options = {}) {
    const { requireImage = true } = options;
    const errors = {};

    if (requireImage) {
        // Cek apakah image adalah File object, string (URL), atau null/undefined
        if (!formData.image || (typeof formData.image === 'string' && formData.image.trim() === '')) {
            errors.image = "Gambar aplikasi harus diisi";
        }
    }

    if (!formData.name || !formData.name.trim()) {
        errors.name = "Nama aplikasi harus diisi";
    }

    if (!formData.description || !formData.description.trim()) {
        errors.description = "Deskripsi aplikasi harus diisi";
    }

    if (!formData.color1 || !formData.color1.trim()) {
        errors.color1 = "Warna pertama harus diisi";
    }

    if (!formData.color2 || !formData.color2.trim()) {
        errors.color2 = "Warna kedua harus diisi";
    }

    return errors;
}

export function hasErrors(errors) {
    return Object.keys(errors).length > 0;
}


