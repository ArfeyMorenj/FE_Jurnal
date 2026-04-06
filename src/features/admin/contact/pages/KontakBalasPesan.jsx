import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Undo,
  Trash2,
  Type,
  Bold,
  Link2,
  Smile,
  Image,
  ArrowRight,
  Loader2,
} from "lucide-react";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import { useMessage } from "../hooks/useMessage";
import { useDeleteModal } from "../../../../store/useDeleteModal";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import { formatDate } from "../../../../utils/formatDate";
import { getGlobalColor, getInitials } from "../../../../utils/avatarGenerator";
import RichTextEditor from "../components/RichTextEditor";
import "../style/quill.css";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useReplyMessage } from "../hooks/useReplyMessage";
import { currentUser } from "../data/currentUser";

const KontakBalasPesanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show, remove } = useMessage();
  const { openDeleteModal } = useDeleteModal();

  const [replyText, setReplyText] = useState("");
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sendReply, loading: sending } = useReplyMessage();

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      const data = await show(id);
      setMessageData(data);
      setLoading(false);
    };

    if (id) {
      fetchMessage();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!messageData) {
    return (
      <div className="flex flex-col gap-6">
        <BreadCrumbs manual={[{ label: "Detail Pesan" }]} />
        <div className="p-8 text-center text-gray-500 bg-white rounded-[10px]">
          Pesan tidak ditemukan.
        </div>
      </div>
    );
  }

  const originalMessageDetail = messageData;
  const existingReplies = messageData.replies || [];

  const { formattedDate, daysAgo } = formatDate(originalMessageDetail.created_at);

  const handleSend = async () => {
    if (!replyText.trim()) return;

    try {
      await sendReply(id, {
        name: currentUser.name,
        email: originalMessageDetail.email,
        message: replyText,
      });

      Toasts("success", 2000, "Terkirim", "Balasan berhasil dikirim ke email penerima");
      setReplyText("");
    } catch (err) {
      Toasts("error", 3000, "Gagal", "Balasan tidak terkirim");
    }
  };

  const handleDiscard = () => {
    setReplyText("");
  };

  const handleDelete = () => {
    openDeleteModal(id, async () => {
      await remove(id);
      navigate("/admin/kotak-masuk");
    });
  };

  const handleBack = () => {
    navigate(`/admin/kotak-masuk/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <BreadCrumbs
        manual={[
          { label: "Detail Pesan", path: `/admin/kotak-masuk/${id}` },
          { label: "Balas Pesan" },
        ]}
      />

      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-[10px] p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 w-full">
            <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0"
                style={{ backgroundColor: getGlobalColor() }}
              >
                {getInitials(originalMessageDetail.name, originalMessageDetail.email)}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-[#000405] text-base mb-1 break-words">
                  {originalMessageDetail.name}
                </h3>
                <p className="text-sm text-[#8B8B8B] break-all">
                  {originalMessageDetail.email}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 text-[#8B8B8B]">
                <p className="text-sm">{formattedDate}</p>
                <p className="text-xs">({daysAgo})</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Kembali"
                >
                  <Undo size={20} className="text-[#8B8B8B]" />
                </button>

                <button
                  onClick={() => remove(id, () => navigate("/admin/kotak-masuk"))}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={20} className="text-[#8B8B8B] hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>

          <h2 className="font-bold text-[#000405] text-lg md:text-xl mb-4">
            {originalMessageDetail.subject}
          </h2>

          <div className="text-[#000405] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {originalMessageDetail.message}
          </div>
        </div>

        {existingReplies &&
          existingReplies.length > 0 &&
          existingReplies.map((reply) => {
            const replyDate = formatDate(reply.created_at);
            return (
              <div key={reply.id} className="bg-white rounded-[10px] p-6 md:p-8 ml-8 md:ml-12">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                      style={{ backgroundColor: getGlobalColor() }}
                    >
                      {getInitials(reply.name, reply.email)}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-[#000405] text-base mb-1">
                        {reply.name}
                      </h3>
                      <p className="text-sm text-[#8B8B8B]">{reply.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[#8B8B8B]">
                      <p className="text-sm">{replyDate.formattedDate}</p>
                      <p className="text-xs">({replyDate.daysAgo})</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBack}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Kembali"
                      >
                        <Undo size={20} className="text-[#8B8B8B]" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-[#000405] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {reply.message}
                </div>
              </div>
            );
          })}
      </div>

      <div className="rounded-[10px] p-4 md:p-6 w-full">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 w-full">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0"
            style={{ backgroundColor: getGlobalColor() }}
          >
            {getInitials(currentUser.name, currentUser.email)}
          </div>

          <div className="flex-1 w-full">
            <RichTextEditor
              value={replyText}
              onChange={setReplyText}
              onSend={handleSend}
              onDiscard={handleDiscard}
              placeholder="Ketikkan balasan Anda."
            />
          </div>
        </div>
      </div>

      <DeleteConfirmModal />
    </div>
  );
};

export default KontakBalasPesanPage;