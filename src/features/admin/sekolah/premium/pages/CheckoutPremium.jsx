import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BreadCrumbs from "../../../../../components/common/BreadCrumbs";
import usePremiumDetail from "../hooks/usePremiumDetail";
import useCreatePayment from "../hooks/useCreatePayment";
import useProfile from "../hooks/useProfile";
import usePaymentChannels from "../hooks/usePaymentChannel";

export default function CheckoutPremium() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState("");

  const { data: packageDetail, loading: loadingPackage, error: errorPackage } = usePremiumDetail(id);
  const { data: profile, loading: loadingProfile, error: errorProfile } = useProfile();
  const { data: channels, loading: loadingChannels } = usePaymentChannels();
  const { createPayment, loading: paying } = useCreatePayment();

  // Get biaya admin berdasarkan payment method yang dipilih
  const getAdminFee = () => {
    if (!paymentMethod || !packageDetail) return 0;
    
    const allChannels = [...channels.banks, ...channels.ewallets];
    const selectedChannel = allChannels.find(ch => ch.code === paymentMethod);
    
    if (!selectedChannel) return 0;
    
    if (selectedChannel.tax < 1) {
      return Math.ceil(Number(packageDetail.price) * selectedChannel.tax);
    }
    
    return selectedChannel.tax;
  };

  const adminFee = getAdminFee();
  const totalAmount = packageDetail ? Number(packageDetail.price) + adminFee : 0;

  const handlePay = async () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran dulu");
      return;
    }

    if (!profile) {
      alert("Data profile belum tersedia");
      return;
    }

    try {
      const res = await createPayment({
        packageId: id,
        method: paymentMethod,
        customerName: profile.name,
        customerEmail: profile.user.email,
        customerPhone: profile.user.phone_number || "081234567890",
      });

      const reference = res.reference;

      const isBank = channels.banks.some(b => b.code === paymentMethod);
      
      if (isBank) {
        navigate(`/sekolah/checkout-bank/${reference}`);
      } else {
        navigate(`/sekolah/checkout-ewallet/${reference}`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(err?.response?.data?.message || "Gagal membuat pembayaran");
    }
  };

  if (loadingPackage || loadingProfile || loadingChannels) {
    return (
      <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="eos-icons:loading" className="text-4xl text-[#CA2323] mx-auto mb-2" />
          <p className="text-[#555]">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (errorPackage || errorProfile) {
    return (
      <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="text-4xl text-red-500 mx-auto mb-2" />
          <p className="text-[#555]">{errorPackage || errorProfile}</p>
        </div>
      </div>
    );
  }

  if (!packageDetail || !profile || !channels) {
    return (
      <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="text-4xl text-red-500 mx-auto mb-2" />
          <p className="text-[#555]">Data tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-[#CA2323] text-white rounded-xl hover:bg-[#B7281F] transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 bg-[#FAFAFA] min-h-screen flex flex-col gap-6">
      <BreadCrumbs 
        role="sekolah"
        manual={[
          { label: "Detail Paket Premium", path: "" }
        ]} 
      />

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">

        <div className="flex-1 bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-[#E8E8E8]">
          
          <div className="flex justify-between items-center border-b border-[#E8E8E8] pb-2">
            <h2 className="font-bold text-[18px] sm:text-[20px] text-[#000405]">Checkout</h2>
            <button
              className="text-[#818181] text-[10px] sm:text-[12px] font-medium underline"
              onClick={() => navigate(-1)}
            >
              Ubah Paket
            </button>
          </div>

          <div className="border border-[#E7E7E7] rounded-2xl p-4 sm:p-5 mt-4 shadow-sm bg-[#FFFDFD] flex flex-col sm:flex-row sm:justify-between gap-4">
            
            <div className="flex gap-3">
              <img src="/logo.png" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full" />
              
              <div>
                <p className="font-bold text-[16px] sm:text-[18px] text-[#CA2323] leading-none">
                  {packageDetail.name}
                </p>
                <p className="text-[12px] sm:text-[13px] text-[#555] mt-1">
                  Untuk pengguna setia MiJurnal
                </p>

                <div className="mt-4 relative">
                  <div className="flex items-start gap-3 relative">
                    <span className="w-3 h-3 rounded-full bg-[#7D7D7D] mt-[2px]" />
                    <p className="text-[14px] font-bold text-[#3F3F3F]">
                      Berlaku Mulai: <span className="font-medium">Hari ini</span>
                    </p>
                  </div>

                  <div className="absolute left-[5px] top-[14px] w-[2px] h-[32px] bg-[#C4C4C4]" />

                  <div className="flex items-start gap-3 mt-4 relative">
                    <span className="w-3 h-3 rounded-full bg-[#4A4A4A] mt-[2px]" />
                    <p className="text-[14px] font-bold text-[#3F3F3F]">
                      Berakhir Pada: <span className="font-medium">30 Januari 2026</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[#CA2323] font-bold text-[18px] sm:text-[20px] leading-tight">
                Rp {Number(packageDetail.price).toLocaleString("id-ID")}
              </p>
              <p className="text-[12px] sm:text-[13px] text-[#777]">{packageDetail.duration}</p>
            </div>
          </div>

          <h3 className="mt-6 sm:mt-8 font-bold text-[18px] sm:text-[20px] text-[#000405]">
            Metode Pembayaran
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-3 sm:mt-4">

            <div>
              <p className="text-[12px] text-[#464646] mb-3 font-medium">E-Wallet</p>
              {channels.ewallets.length > 0 ? (
                channels.ewallets.map((ewallet) => (
                  <label 
                    key={ewallet.id} 
                    className="flex items-center gap-3 px-4 py-2 border border-[#E0E0E0] rounded-xl mb-2 cursor-pointer hover:border-[#D3322A] transition"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={ewallet.code}
                      onChange={() => setPaymentMethod(ewallet.code)}
                      className="accent-[#CA2323]"
                    />
                    <img 
                      src={ewallet.icon_url} 
                      alt={ewallet.name} 
                      className="w-6 h-6 object-contain" 
                    />
                    <span className="text-[14px]">{ewallet.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-[12px] text-[#999]">Tidak ada e-wallet tersedia</p>
              )}
            </div>

            <div>
              <p className="text-[12px] text-[#464646] mb-3 font-medium">Transfer Bank</p>
              {channels.banks.length > 0 ? (
                channels.banks.map((bank) => (
                  <label 
                    key={bank.id} 
                    className="flex items-center gap-3 px-4 py-2 border border-[#E0E0E0] rounded-xl mb-2 cursor-pointer hover:border-[#D3322A] transition"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={bank.code}
                      onChange={() => setPaymentMethod(bank.code)}
                      className="accent-[#CA2323]"
                    />
                    <img 
                      src={bank.icon_url} 
                      alt={bank.name} 
                      className="w-7 h-7 object-contain" 
                    />
                    <span className="text-[14px]">{bank.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-[12px] text-[#999]">Tidak ada bank tersedia</p>
              )}
            </div>

          </div>

          <div className="mt-6 sm:mt-8">
            <h3 className="font-bold text-[15px] sm:text-[16px] text-[#000405] mb-2">Deskripsi</h3>
            <div
              className="text-[13px] sm:text-[14px] text-[#555] prose prose-sm max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: packageDetail.description }}
            />

            <h3 className="font-bold text-[15px] sm:text-[16px] text-[#000405] mt-4 mb-2">Manfaat</h3>
            <div
              className="text-[13px] sm:text-[14px] text-[#555] prose prose-sm max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: packageDetail.benefits }}
            />
          </div>
        </div>

        <div className="w-full lg:w-[340px] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E8E8E8] h-fit">
          <h3 className="font-bold text-[18px] text-[#000405] pb-3 border-b border-[#E8E8E8]">
            Ringkasan
          </h3>

          <div className="mt-4 flex items-center gap-3">
            <img
              src="/logo.png"
              className="w-12 h-12 rounded-full object-contain border border-[#E5E5E5]"
            />
            <div>
              <p className="font-semibold text-[15px] text-[#000405] leading-none">
                {packageDetail.name}
              </p>
              <p className="text-[#CA2323] text-[14px] font-bold mt-1">
                Rp {Number(packageDetail.price).toLocaleString("id-ID")} / {packageDetail.duration}
              </p>
            </div>
          </div>

          <div className="mt-4 relative">
            <div className="flex items-start gap-3 relative">
              <span className="w-3 h-3 rounded-full bg-[#7D7D7D] mt-[2px]" />
              <p className="text-[14px] font-bold text-[#3F3F3F]">
                Berlaku Mulai: <span className="font-medium">Hari ini</span>
              </p>
            </div>

            <div className="absolute left-[5px] top-[14px] w-[2px] h-[32px] bg-[#C4C4C4]" />

            <div className="flex items-start gap-3 mt-4 relative">
              <span className="w-3 h-3 rounded-full bg-[#4A4A4A] mt-[2px]" />
              <p className="text-[14px] font-bold text-[#3F3F3F]">
                Berakhir Pada: <span className="font-medium">30 Januari 2026</span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[14px] text-[#555] flex justify-between">
              Harga Paket
              <span className="font-bold text-[#000]">
                Rp {Number(packageDetail.price).toLocaleString("id-ID")}
              </span>
            </p>
          </div>

          {adminFee > 0 && (
            <div className="mt-3">
              <p className="text-[14px] text-[#555] flex justify-between">
                Biaya Admin
                <span className="font-bold text-[#000]">
                  Rp {adminFee.toLocaleString("id-ID")}
                </span>
              </p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-[14px] text-[#555] flex justify-between">
              Metode Pembayaran
              <span className="font-bold text-[#000]">
                {paymentMethod || "-"}
              </span>
            </p>
          </div>

          <div className="my-5 border-t border-[#E8E8E8]" />

          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-[15px] text-[#000405]">Total Bayar</p>
            <p className="text-[20px] text-[#CA2323] font-extrabold">
              Rp {totalAmount.toLocaleString("id-ID")}
            </p>
          </div>

          <button
            onClick={handlePay}
            disabled={paying || !paymentMethod}
            className="mt-2 bg-[#CA2323] hover:bg-[#B7281F] duration-200 text-white w-full py-3 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Icon icon="mingcute:card-pay-fill" />
            {paying ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </div>

      </div>
    </div>
  );
}