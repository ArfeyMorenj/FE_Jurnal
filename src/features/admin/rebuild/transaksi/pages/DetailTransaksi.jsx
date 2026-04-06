import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../../components/common/Button";
import { Icon } from "@iconify/react";
import { QRCodeSVG } from "qrcode.react";
import useTransaksiDetail from "../hooks/useTransaksiDetail";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import formatDate from "../../../../../helper/formatDate";

export default function DetailTransaksiPage() {
  const navigate = useNavigate();
  const { reference } = useParams();

  const { data: transaksi, loading, error } = useTransaksiDetail(reference);

  const orderItem = transaksi?.order_items?.[0];

  const getMasaBerlaku = () => {
    if (!transaksi?.created_at) return "-";
    const startDate = new Date(transaksi.created_at);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
    return `${formatDate(transaksi.created_at)} - ${formatDate(endDate.toISOString())}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full px-4 md:px-0">
        <div className="bg-white rounded-[12px] p-10 mt-6 shadow-sm border border-gray-200 max-w-4xl w-full">
          <div className="flex items-center justify-center py-20">
            <Icon icon="eos-icons:loading" className="text-4xl text-[#CA2323]" />
            <p className="ml-3 text-gray-600">Memuat detail transaksi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !transaksi) {
    return (
      <div className="flex flex-col items-center w-full px-4 md:px-0">
        <div className="bg-white rounded-[12px] p-10 mt-6 shadow-sm border border-gray-200 max-w-4xl w-full">
          <div className="flex flex-col items-center justify-center py-20">
            <Icon icon="mdi:alert-circle" className="text-5xl text-red-500 mb-3" />
            <p className="text-gray-600 mb-4">{error || "Detail transaksi tidak ditemukan"}</p>
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#CA2323] text-white rounded-lg px-6 py-2 hover:bg-[#B7281F]"
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  w-full px-4 md:px-0">
      <BreadCrumbs 
        role="admin"
        manual={[
          { label: "Detail Invoice", path: "" }
        ]} 
      />

      <div className="bg-white rounded-[12px] p-4 sm:p-6 md:p-10 mt-6 shadow-sm border border-gray-200 max-w-4xl w-full">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-44 md:w-80 h-auto object-contain"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-black">
            INVOICE
          </h1>
        </div>

        <div className="w-full h-[4px] bg-black my-4"></div>

        {/* Status Badge */}
        <div className="flex justify-end mb-4">
          <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
            transaksi.status === "PAID" ? "bg-green-100 text-green-700" :
            transaksi.status === "UNPAID" ? "bg-yellow-100 text-yellow-700" :
            transaksi.status === "EXPIRED" ? "bg-red-100 text-red-700" :
            "bg-gray-100 text-gray-700"
          }`}>
            {transaksi.status === "PAID" ? "LUNAS" :
             transaksi.status === "UNPAID" ? "BELUM DIBAYAR" :
             transaksi.status === "EXPIRED" ? "KADALUARSA" :
             transaksi.status}
          </span>
        </div>

        {/* INTRO TEXT */}
        <div className="flex items-start gap-3 mb-6 mt-6 md:mt-10">
          <div className="w-[8px] bg-[#E7352B] min-h-[40px]"></div>
          <p className="text-sm text-gray-900 leading-relaxed">
            Invoice ini diterbitkan sebagai bukti resmi pembelian paket premium.
            Mohon lakukan pembayaran sebelum tanggal jatuh tempo dan simpan
            invoice ini sebagai arsip.
          </p>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-4">
          <div className="text-sm leading-6 text-black">
            <p><span className="font-bold">Nama Pembeli:</span> {transaksi.customer_name}</p>
            <p><span className="font-bold">Email:</span> {transaksi.customer_email}</p>
            <p><span className="font-bold">No. Telepon:</span> {transaksi.customer_phone}</p>
            <p><span className="font-bold">No. Invoice:</span> {transaksi.merchant_ref}</p>
            <p><span className="font-bold">Referensi:</span> {transaksi.reference}</p>
            <p><span className="font-bold">Tanggal:</span> {formatDate(transaksi.created_at)}</p>
          </div>

          <div className="flex justify-center md:justify-end items-start">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-24 md:h-32 w-auto object-contain opacity-80"
            />
          </div>
        </div>

        {/* TABEL */}
        <div className="border border-black overflow-auto mt-3">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-[#d21f28] text-white">
              <tr>
                <th className="py-3 px-2 md:px-4 text-center text-sm font-semibold border-r w-10">
                  No.
                </th>
                <th className="py-3 px-2 md:px-4 text-center text-sm font-semibold border-r">
                  Nama Paket
                </th>
                <th className="py-3 px-2 md:px-4 text-center text-sm font-semibold border-r">
                  Masa Berlaku
                </th>
                <th className="py-3 px-2 md:px-4 text-center text-sm font-semibold border-r">
                  Metode Pembayaran
                </th>
                <th className="py-3 px-2 md:px-4 text-center text-sm font-semibold">
                  Rincian Tagihan
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-black">
                <td className="py-3 px-2 md:px-4 text-center text-sm font-semibold text-gray-900 border-r">1</td>
                <td className="py-3 px-2 md:px-4 text-center text-sm font-semibold text-gray-900 border-r">
                  {orderItem?.name || "Premium Package"}
                </td>
                <td className="py-3 px-2 md:px-4 text-center text-sm font-semibold text-gray-900 border-r">
                  {getMasaBerlaku()}
                </td>
                <td className="py-3 px-2 md:px-4 text-center text-sm font-semibold text-gray-900 border-r">
                  {transaksi.payment_name || "-"}
                </td>
                <td className="py-3 px-2 md:px-4 text-center text-sm font-semibold text-gray-900">
                  Rp {(orderItem?.price || transaksi.amount).toLocaleString("id-ID")}
                </td>
              </tr>

              {/* Biaya Admin jika ada */}
              {transaksi.total_fee > 0 && (
                <tr className="border-b border-black">
                  <td colSpan={4} className="py-3 px-4 text-right font-semibold text-gray-900 border-r">
                    Biaya Admin
                  </td>
                  <td className="py-3 px-4 text-center text-sm font-semibold text-gray-900">
                    Rp {transaksi.total_fee.toLocaleString("id-ID")}
                  </td>
                </tr>
              )}

                    <tr>
                <td colSpan={4} className="py-3 px-4 text-right font-bold text-gray-900 border-r bg-gray-50">
                  Total Pembayaran
                </td>
                <td className="py-3 px-4 text-center text-sm font-bold text-[#CA2323] bg-gray-50">
                  Rp {(transaksi.amount + transaksi.total_fee).toLocaleString("id-ID")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 text-xs text-gray-900 gap-8">
          {/* LEFT */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Icon icon="ph:building-office-fill" width="18" />
              <p className="font-semibold">PT Humma Teknologi Indonesia</p>
            </div>
            <div className="flex items-start gap-2">
              <Icon icon="mdi:location" width="18" className="mt-0.5" />
              <p className="leading-snug max-w-[260px]">
                Jl. Soekarno Hatta No.9, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="bi:telephone-fill" width="16" />
              <p>+62 812-3456-7890</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="wpf:message" width="16" />
              <p>support@mijurnal.com</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end"> 
            <p className="font-semibold text-xs mb-2">PT Humma Teknologi Indonesia</p> 
            <div className="flex flex-col items-center text-center pr-9"> 
              <QRCodeSVG 
                value={transaksi.reference || transaksi.merchant_ref} 
                size={96} 
                className="w-24 h-24" 
              /> 
              <p className="text-xs font-medium mt-3">_____________________</p>
              <p className="text-xs font-medium mt-1">Direktur Utama</p>
            </div> 
          </div> 
        </div>

        {transaksi.status === "UNPAID" && transaksi.pay_code && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-bold text-yellow-800 mb-2">Informasi Pembayaran</p>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><span className="font-semibold">Kode Pembayaran:</span> {transaksi.pay_code}</p>
              <p><span className="font-semibold">Jatuh Tempo:</span> {formatDate(transaksi.expired_time)}</p>
            </div>
          </div>
        )}
      </div>

      {/* BUTTON */}
      <div className="bg-white rounded-[10px] p-4 md:p-5 mt-6 shadow-sm border border-gray-200 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#8B8B8B] text-[13px] font-bold rounded-lg px-6 py-2 hover:bg-gray-500 text-white"
          >
            Kembali
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={() => window.print()}
              className="bg-[#CA2323] text-[13px] font-bold rounded-lg px-6 py-2 hover:bg-[#B7281F] text-white flex items-center gap-2"
            >
              <Icon icon="mdi:printer" width="18" />
              Cetak Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}