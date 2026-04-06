import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../../components/common/Button";
import { QRCodeSVG } from "qrcode.react";
import { useTransactionDetail } from "../hooks/useTransactionDetail";
import { Loader2 } from "lucide-react";

export default function DetailSubscribePage() {
  const { id: reference } = useParams(); // id di route sebenarnya adalah reference
  const navigate = useNavigate();
  const { transaction, isLoading, error } = useTransactionDetail(reference);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin text-primary-red mx-auto mb-4" size={32} />
          <p className="text-gray-600">Memuat detail transaksi...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !transaction) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">Error</p>
          <p className="text-gray-600 text-sm mb-4">{error || "Data tidak ditemukan"}</p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get package duration (masa berlaku) - bisa dari order_items atau expired_time
  const getPackageDuration = () => {
    // Default to 1 Tahun if can't determine
    return "1 Tahun";
  };

  const totalAmount = transaction.amount + transaction.total_fee;

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0">

      <div className="bg-white rounded-[12px] p-4 sm:p-6 md:p-10 mt-6 shadow-sm border border-gray-200 max-w-4xl w-full">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src="/images/logo.png"
            className="w-44 md:w-80"
            alt="Mi Jurnal Logo"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-black">INVOICE</h1>
        </div>

        <div className="w-full h-[4px] bg-black my-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-6">
          <div className="text-sm leading-6 text-black">
            <p><span className="font-bold">Nama Pembeli:</span> {transaction.customer_name || "-"}</p>
            <p><span className="font-bold">Email:</span> {transaction.customer_email || "-"}</p>
            <p><span className="font-bold">No. Telepon:</span> {transaction.customer_phone || "-"}</p>
            <p><span className="font-bold">No. Invoice:</span> {transaction.merchant_ref || "-"}</p>
            <p><span className="font-bold">Reference:</span> {transaction.reference || "-"}</p>
            <p><span className="font-bold">Tanggal:</span> {formatDate(transaction.created_at)}</p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img src="/logo.png" className="h-28 opacity-40" alt="Logo" />
          </div>
        </div>

        <div className="border border-black overflow-auto mt-3">
          <table className="w-full border-collapse min-w-[650px]">
            <thead className="bg-[#d21f28] text-white">
              <tr>
                <th className="py-3 px-4 text-center text-sm font-semibold border-r w-[50px]">No.</th>
                <th className="py-3 px-4 text-center text-sm font-semibold border-r">Nama Paket</th>
                <th className="py-3 px-4 text-center text-sm font-semibold border-r">Masa Berlaku</th>
                <th className="py-3 px-4 text-center text-sm font-semibold border-r">Metode Pembayaran</th>
                <th className="py-3 px-4 text-center text-sm font-semibold">Total Tagihan</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-black">
                <td className="py-3 px-4 text-center font-semibold border-r">1</td>
                <td className="py-3 px-4 text-center font-semibold border-r">{transaction.packageName}</td>
                <td className="py-3 px-4 text-center font-semibold border-r">{getPackageDuration()}</td>
                <td className="py-3 px-4 text-center font-semibold border-r">{transaction.payment_name || "-"}</td>
                <td className="py-3 px-4 text-center font-semibold">
                  {formatCurrency(transaction.amount)}
                </td>
              </tr>

              {transaction.total_fee > 0 && (
                <tr className="border-b border-black">
                  <td colSpan={4} className="py-3 px-4 text-right font-semibold border-r">
                    Biaya Admin
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">
                    {formatCurrency(transaction.total_fee)}
                  </td>
                </tr>
              )}

              <tr>
                <td colSpan={4} className="py-3 px-4 text-right font-semibold border-r">
                  Total
                </td>
                <td className="py-3 px-4 text-center font-semibold">
                  {formatCurrency(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 text-xs text-gray-900 gap-8">
          <div>
            <p className="font-semibold">PT Hummatech Indonesia</p>
            <p>Jl. Mawar No. 21, Malang, Jawa Timur</p>
            <p>+62 812-3456-7890</p>
            <p>support@hummatech.com</p>
          </div>

          <div className="flex flex-col items-end">
            {transaction.checkout_url && (
              <QRCodeSVG value={transaction.checkout_url} size={96} />
            )}
            <p className="font-medium mt-2">Fauzan Rahmanda</p>
            <p className="text-[10px]">Direktur Utama</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] p-4 mt-10 shadow-sm max-w-4xl w-full">
        <div className="flex justify-end">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Kembali
          </Button>
        </div>
      </div>

    </div>
  );
}
