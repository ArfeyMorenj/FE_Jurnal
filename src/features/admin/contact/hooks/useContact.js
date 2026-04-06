import { useContactApi } from "../api/apiContact";
import { useState, useEffect } from "react";

export function useContact() {
    const api = useContactApi();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        const fetchContact = async () => {
            setLoading(true);
            try {
                const res = await api.list();
                setContact(res.data.data[0] || null);
            } catch (err) {
                console.error("Fetch contact error:", err);
                Toasts("error", 3000, "Gagal", "Tidak dapat memuat data contact");
            } finally {
                setLoading(false);
            }
        }
        fetchContact();
    }, []);

    return { contact, loading };
}