import { Toasts } from "../../../../utils/Toast";
import { useContactApi } from "../api/apiContact";
import { useState } from "react";
import { contactSchema } from "../schemas/contactSchema";

export function useContactForm(initialData = {}, contactId = null) {
    const api = useContactApi()

    const [formData, setFormData] = useState(initialData); 
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        console.log("schema:", contactSchema);
        const result = contactSchema.safeParse(formData);

        if (!result.success) {
            const newErr = {};
            result.error.issues.forEach((e) => {
                const fieldName = e.path[0];
                newErr[fieldName] = e.message;
            } )
            setErrors(newErr);
            return false
        }
        setErrors({});
        return true;
    }

    const buildPayload = (isUpdate = false) => {
        const fd = new FormData();

        Object.keys(formData).forEach((k) => {
           if (formData[k] !== undefined && formData[k] !== null) {
            fd.append(k, formData[k]);
           }
        });

        if (isUpdate) {
            fd.append("_method", "PUT");
        }

        return fd;
    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (value.includes("<iframe")) {
            const match = value.match(/src="([^"]+)"/);
            if (match && match[1]) {
            value = match[1]; 
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const submit = async () => {
        console.log("submit() executed, formData:", formData);
        if (!validate()) return false;
        console.log("validate: ", validate());

        
        setLoading(true);

        try {
            const payload = buildPayload(!!contactId);

            let res
            if (contactId) {
                res = await api.update(contactId, payload);
            } else {
                res = await api.create(payload);
            }

            Toasts("success", 2000, "Berhasil", "Kontak berhasil disimpan")
            return true;
        } catch (err) {
            const res = err.response?.data;
            if (res?.status === 422 && res?.data?.errors) {
                const backendErrors =  {}
                Object.keys(res.data.errors).forEach((k) => {
                    backendErrors[k] = res.data.errors[k][0];
                });
                setErrors(backendErrors);
            } else {
                Toasts("error", 3000, "Gagal", "Kontak tidak dapat disimpan");
            }

            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        formData,
        setFormData,
        setErrors,
        errors,
        loading,
        handleChange,
        submit,
    }
}