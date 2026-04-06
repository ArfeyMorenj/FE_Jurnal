import { useState } from "react";
import { Toasts } from "../../../../utils/Toast";
import { useMessageApi } from "../api/apiMessage";

export function useReplyMessage() {
  const api = useMessageApi();
  const [loading, setLoading] = useState(false);

  const sendReply = async (messageId, replyData) => {
    console.log("sendReply called", { messageId, replyData });

    if (!replyData || !replyData.message || !replyData.message.trim()) {
      Toasts("error", 2000, "Gagal", "Isi balasan tidak boleh kosong");
      console.log("Balasan kosong, tidak dikirim");
      return null;
    }

    setLoading(true);
    try {
      console.log("Mengirim data ke API...");
      const res = await api.reply(messageId, replyData);
      console.log("Response dari API:", res);

      Toasts("success", 2000, "Terkirim", "Balasan berhasil dikirim");
      return res?.data?.data || null;
    } catch (err) {
      console.error("Terjadi error saat mengirim balasan:", err);
      Toasts("error", 3000, "Gagal", "Balasan tidak terkirim");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendReply,
  };
}
