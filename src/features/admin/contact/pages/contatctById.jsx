import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Undo, Trash2 } from "lucide-react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import Button from "../../../../components/common/Button";
import { useMessage } from "../hooks/useMessage";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import { formatDate } from "../../../../utils/formatDate";
import { getGlobalColor, getInitials } from "../../../../utils/avatarGenerator";

const ContactByIdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show, remove } = useMessage();
  const [messageDetail, setMessageDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const data = await show(id);
      setMessageDetail(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  const handleReply = () => navigate(`/admin/kotak-masuk/${id}/balas`);
  const handleBack = () => navigate("/admin/kotak-masuk");

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <BreadCrumbs manual={[{ label: "Detail Pesan" }]} />
        <div className="p-8 text-center text-gray-500 bg-white rounded-[10px]">
          Memuat pesan...
        </div>
      </div>
    );
  }

  if (!messageDetail) {
    return (
      <div className="flex flex-col gap-6">
        <BreadCrumbs manual={[{ label: "Detail Pesan" }]} />
        <div className="p-8 text-center text-gray-500 bg-white rounded-[10px]">
          Pesan tidak ditemukan.
        </div>
      </div>
    );
  }

  const { formattedDate, daysAgo } = formatDate(messageDetail.created_at);

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs
        manual={[
          { label: "Detail Pesan" },
        ]}
      />

      <div className="bg-white rounded-[10px] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: getGlobalColor(messageDetail.name) }}
            >
              {getInitials(messageDetail.name, messageDetail.email)}
            </div>

            <div>
              <h3 className="font-semibold">{messageDetail.name}</h3>
              <p className="text-sm text-[#8B8B8B]">{messageDetail.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-2 md:gap-4">
            <div className="flex items-center gap-1 text-[#8B8B8B]">
              <p className="text-sm">{formattedDate}</p>
              <p className="text-xs">({daysAgo})</p>
            </div>

            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Kembali"
            >
              <Undo size={20} className="text-[#8B8B8B]" />
            </button>

            <button
              onClick={() => remove(id, () => navigate("/admin/kotak-masuk"))}
              className="p-2 hover:bg-red-50 rounded-lg"
              title="Hapus"
            >
              <Trash2 size={20} className="text-[#8B8B8B] hover:text-red-500" />
            </button>
          </div>
        </div>

        <h2 className="font-bold text-lg md:text-xl mb-4">
          {messageDetail.subject}
        </h2>

        <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
          {messageDetail.message}
        </div>
      </div>

      <div className="flex justify-start">
        <Button
          onClick={handleReply}
          className="bg-white border border-gray-300 text-[#000405] text-[13px] font-bold rounded-lg hover:bg-gray-50 flex items-center gap-2"
          leftIcon={<Undo size={16} />}
        >
          Balas Pesan
        </Button>
      </div>

      <DeleteConfirmModal />
    </div>
  );
};

export default ContactByIdPage;