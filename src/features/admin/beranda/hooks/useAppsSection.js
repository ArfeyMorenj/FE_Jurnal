import { useEffect, useState } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useDeleteModal } from "../../../../store/useDeleteModal";
import { useAppsApi } from "../api/apiApps";

export const useAppsSection = () => {
  const api = useAppsApi();

  const [apps, setApps] = useState([]);
  const [recordMap, setRecordMap] = useState({});
  const [appOptions, setAppOptions] = useState([]);
  const [leadInText, setLeadInText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const { openDeleteModal, setLoading, closeDeleteModal } = useDeleteModal();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const listRes = await api.list();
      
      setAppOptions(
        listRes.data.data.map((item) => ({
          label: item.name,
          value: item.id,
          fullData: {
            id: item.id,
            name: item.name,
            slug: item.slug,
            image: item.image ?? "/img/default.png",
            description: item.description,
            buttonText: item.button_text,
            gradientColor1: item.color_gradient_start ?? item.gradientColor1 ?? "",
            gradientColor2: item.color_gradient_end ?? item.gradientColor2 ?? "",
            buttonLink: item.button_link,
            textColor: item.text_color,
            section: item.section, 
          }
        }))
      );

      const sectionRes = await api.getSection();
      const sectionData = sectionRes.data.data.data || [];

      if (sectionData.length > 0) {
        setLeadInText(sectionData[0].lead_in_text || "");

        const uniqueApps = [];
        const mapping = {};
        const seen = new Set();

        sectionData.forEach((record) => {
          const appId = record.application.id;

          if (!seen.has(appId)) {
            seen.add(appId);

            uniqueApps.push({
              id: appId,
              name: record.application.name,
              slug: record.application.slug,
              image: record.application.image ?? "/img/default.png",
              description: record.application.description,
              buttonText: record.application.button_text,
              gradientColor1: record.application.color_gradient_start,
              gradientColor2: record.application.color_gradient_end,
              buttonLink: record.application.button_link,
              textColor: record.application.text_color,
              section: record.application.section, // TAMBAHKAN INI
            });

            mapping[appId] = record.id;
          }
        });

        setApps(uniqueApps);
        setRecordMap(mapping);
      }
    } catch (err) {
      Toasts("error", 3000, "Gagal memuat data apps section");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddApp = () => {
    if (apps.length >= 3) {
      Toasts("warning", 2000, "Maksimal 3 aplikasi");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (id) => {
    if (apps.length >= 3) {
      Toasts("warning", 2000, "Maksimal 3 aplikasi");
      return;
    }

    if (apps.some((a) => a.id === id)) {
      Toasts("warning", 2000, "Aplikasi sudah ditambahkan");
      return;
    }

    const chosen = appOptions.find((opt) => opt.value === id);

    setApps((prev) => [
      ...prev,
      chosen.fullData,
    ]);

    setIsModalOpen(false);
    Toasts("success", 1500, "Aplikasi ditambahkan (belum disimpan)");
  };

  const handleEdit = (item) => {
    setSelectedApp(item);
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = (newId) => {
    if (apps.some((a) => a.id === newId && a.id !== selectedApp.id)) {
      Toasts("warning", 2000, "Aplikasi sudah ada dalam list");
      return;
    }

    const chosen = appOptions.find((o) => o.value === newId);

    setApps((prev) =>
      prev.map((a) =>
        a.id === selectedApp.id
          ? chosen.fullData
          : a
      )
    );

    const oldRecordId = recordMap[selectedApp.id];
    if (oldRecordId) {
      setRecordMap((prev) => {
        const updated = { ...prev };
        delete updated[selectedApp.id];
        updated[newId] = oldRecordId;
        return updated;
      });
    }

    setIsEditModalOpen(false);
    Toasts("success", 1500, "Aplikasi diperbarui (belum disimpan)");
  };

  const handleDelete = (item) => {
    openDeleteModal(item.name, async () => {
      setLoading(true);

      try {
        const recordId = recordMap[item.id];

        if (recordId) {
          await api.deleteRecord(recordId);

          setApps((prev) => prev.filter((a) => a.id !== item.id));

          setRecordMap((prev) => {
            const updated = { ...prev };
            delete updated[item.id];
            return updated;
          });

          Toasts("success", 1500, "Aplikasi berhasil dihapus");
        } else {
          setApps((prev) => prev.filter((a) => a.id !== item.id));
          Toasts("success", 1500, "Aplikasi dibatalkan");
        }

        closeDeleteModal();
      } catch {
        Toasts("error", 2000, "Gagal menghapus aplikasi");
      } finally {
        setLoading(false);
      }
    });
  };

  return {
    apps,
    recordMap,
    appOptions,
    leadInText,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedApp,
    handleAddApp,
    handleConfirmAdd,
    handleEdit,
    handleConfirmEdit,
    handleDelete,
  };
};