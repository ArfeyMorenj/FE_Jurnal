import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import usePaymentDetail from "../hooks/usePaymentDetail";
import usePaymentChannels from "../hooks/usePaymentChannel";

export default function BankCheckout() {
  const { reference } = useParams();
  const navigate = useNavigate();
  
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const { data: paymentData, loading: loadingPayment, error: errorPayment, refetch } = usePaymentDetail(reference);
  const { data: channels, loading: loadingChannels } = usePaymentChannels();

  const channelData = React.useMemo(() => {
    if (!paymentData || !channels) return null;
    
    const allChannels = [...channels.banks, ...channels.ewallets];
    return allChannels.find(ch => ch.name === paymentData.payment_name);
  }, [paymentData, channels]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!paymentData?.expired_time) return;

    const updateTimer = () => {
      const expiredDate = new Date(paymentData.expired_time);
      const now = new Date();
      const diff = Math.floor((expiredDate - now) / 1000);

      if (diff <= 0) {
        setTimeLeft("Kadaluarsa");
        return;
      }

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [paymentData]);

  const handleRefresh = async () => {
    await refetch();
  };

  if (loadingPayment || loadingChannels) {
    return (
      <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="eos-icons:loading" className="text-4xl text-[#CA2323] mx-auto mb-2" />
          <p className="text-[#555]">Memuat data pembayaran...</p>
        </div>
      </div>
    );
  }

  if (errorPayment || !paymentData) {
    return (
      <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="text-4xl text-red-500 mx-auto mb-2" />
          <p className="text-[#555] mb-4">{errorPayment || "Data pembayaran tidak ditemukan"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#CA2323] text-white rounded-xl hover:bg-[#B7281F] transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  let instructions = paymentData.instructions;
  if (typeof instructions === "string" && instructions) {
    try {
      instructions = JSON.parse(instructions);
    } catch (e) {
      instructions = null;
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#F5F5F5] min-h-screen">
      <BreadCrumbs 
        role="sekolah"
        manual={[
          { label: "Pembayaran", path: "" }
        ]} 
      />

      <div className="mt-5 bg-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:clock-outline" className="text-2xl text-[#CA2323]" />
          <div>
            <p className="text-[12px] text-[#777]">Selesaikan Pembayaran Dalam</p>
            <p className="font-bold text-[16px] text-[#CA2323]">{timeLeft}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[12px] text-[#777] mb-1">Status</p>
          <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold ${
            paymentData.status === "PAID" ? "bg-green-100 text-green-700" : 
            paymentData.status === "UNPAID" ? "bg-yellow-100 text-yellow-700" :
            paymentData.status === "EXPIRED" ? "bg-red-100 text-red-700" :
            "bg-gray-100 text-gray-700"
          }`}>
            {paymentData.status === "PAID" ? "Dibayar" : 
             paymentData.status === "UNPAID" ? "Menunggu Pembayaran" : 
             paymentData.status === "EXPIRED" ? "Kadaluarsa" :
             paymentData.status}
          </span>
        </div>
      </div>

      {paymentData.status === "PAID" && (
        <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <Icon icon="mdi:check-circle" className="text-2xl text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-green-800 text-[14px]">Pembayaran Berhasil!</p>
            <p className="text-[12px] text-green-700 mt-1">
              Transaksi Anda telah diverifikasi. Terima kasih atas pembayaran Anda.
            </p>
          </div>
        </div>
      )}

      <div className="w-full bg-white rounded-2xl shadow-sm mt-5 py-12 px-4 flex flex-col items-center">

        <div className="flex items-center gap-2 mb-6">
          <img src="/images/logo.png" className="w-50 object-contain" alt="MiJurnal" />
        </div>

        <div className="w-full max-w-md bg-white border border-[#CA2323] rounded-2xl p-6 sm:p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[12px] text-[#777] mb-1">Metode Pembayaran</p>
              <p className="font-bold text-[14px] sm:text-[16px] text-[#000]">
                {paymentData.payment_name || "Bank Transfer"}
              </p>
            </div>
            {channelData?.icon_url && (
              <img
                src={channelData.icon_url}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                alt={paymentData.payment_name}
              />
            )}
          </div>

          {paymentData.pay_code && (
            <>
              <p className="font-medium text-[13px] sm:text-[14px] mb-2">
                Nomor Virtual Account :
              </p>
              <div className="relative mb-6">
                <input
                  readOnly
                  value={paymentData.pay_code}
                  className="w-full border border-[#818181] rounded-xl px-4 py-3 text-center font-bold text-[16px] sm:text-[18px] bg-[#F9F9F9] focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(paymentData.pay_code)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition"
                  title="Salin"
                >
                  {copied ? (
                    <Icon icon="mdi:check" width="20" className="text-green-600" />
                  ) : (
                    <Icon icon="mdi:content-copy" width="20" />
                  )}
                </button>
              </div>
            </>
          )}

          <p className="text-[11px] font-medium text-[#464646]">Nama Penerima :</p>
          <p className="font-semibold text-[13px] text-[#464646] mb-4">{paymentData.customer_name}</p>

          <div className="mb-6">
            <p className="text-[11px] font-medium text-[#464646]">
              Nominal Yang Harus Dibayar :
            </p>
            <p className="text-[#CA2323] font-bold text-[18px] sm:text-[20px]">
              Rp {Number(paymentData.amount).toLocaleString("id-ID")}
            </p>
            {paymentData.total_fee > 0 && (
              <p className="text-[11px] text-[#777] mt-1">
                (Termasuk biaya admin: Rp {Number(paymentData.total_fee).toLocaleString("id-ID")})
              </p>
            )}
          </div>

          {instructions && Array.isArray(instructions) && instructions.length > 0 && (
            <div className="border-t border-[#E8E8E8] pt-4">
              <p className="mb-3 font-bold text-[13px] sm:text-[14px]">Panduan Pembayaran</p>

              <div className="space-y-3">
                {instructions.map((instruction, idx) => (
                  <details key={idx} className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between bg-[#F9F9F9] px-4 py-2 rounded-lg hover:bg-[#F0F0F0] transition">
                      <span className="font-semibold text-[12px] sm:text-[13px]">{instruction.title}</span>
                      <Icon 
                        icon="mdi:chevron-down" 
                        className="text-xl transition-transform group-open:rotate-180" 
                      />
                    </summary>
                    
                    <div className="mt-3 px-2">
                      <ol className="text-[11px] sm:text-[12px] text-[#464646] space-y-2 list-decimal ml-4">
                        {instruction.steps.map((step, stepIdx) => (
                          <li 
                            key={stepIdx}
                            dangerouslySetInnerHTML={{ __html: step }}
                          />
                        ))}
                      </ol>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 bg-[#FFF9F0] border border-[#FFE4B5] rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Icon icon="mdi:information" className="text-[#FF9800] text-lg mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-[#555]">
                Pastikan nominal yang ditransfer <span className="font-bold">sesuai persis</span> dengan yang tertera. 
                Pembayaran akan otomatis terverifikasi setelah transfer berhasil.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E8E8]">
            <p className="text-[10px] text-[#999]">Nomor Referensi</p>
            <p className="text-[11px] font-mono text-[#555]">{paymentData.merchant_ref}</p>
          </div>
        </div>

      </div>

      <div className="w-full bg-white rounded-2xl shadow-sm mt-6 p-4 flex flex-col sm:flex-row sm:justify-end items-center gap-3">
        <button
          onClick={() => navigate("/sekolah/paket-premium")}
          className="w-full sm:w-auto px-6 py-2 bg-[#8B8B8B] hover:bg-[#757575] rounded-xl font-medium transition text-white"
        >
          Kembali ke Premium
        </button>

        {paymentData.status !== "PAID" && (
          <button
            onClick={handleRefresh}
            disabled={loadingPayment}
            className="w-full sm:w-auto px-6 py-2 bg-[#CA2323] hover:bg-[#B7281F] rounded-xl font-medium transition text-white flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Icon icon="mdi:refresh" className={loadingPayment ? "animate-spin" : ""} />
            {loadingPayment ? "Memuat..." : "Cek Status Pembayaran"}
          </button>
        )}
      </div>
    </div>
  );
}