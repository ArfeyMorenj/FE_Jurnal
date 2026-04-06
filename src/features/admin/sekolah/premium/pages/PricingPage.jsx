import { usePremiumPackages } from "../hooks/usePremiumPackages";
import PremiumCard from "../components/PremiumCard";

export default function PricingPage() {
  const { packages, loading } = usePremiumPackages();

  return (
    <div className="flex flex-col items-center py-15 gap-3">
      <h1 className="text-[40px] font-bold text-[#464646]">
        Siap Meningkatkan Efisiensi Bersama Kami?
      </h1>

      <p className="text-[#464646] text-center max-w-2xl">
        Tak perlu repot urus pencatatan. Serahkan pada MiJurnal untuk mengelola jurnal guru, siswa, dan fitur jurnal lainnya yang segera tersedia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        

        {/* Loading */}
        {loading && (
          <p className="col-span-2 text-center">Memuat paket...</p>
        )}

        {/* Render paket dari API */}
        {!loading &&
          packages.map((item) => (
            <PremiumCard
              key={item.id}
              id={item.id} 
              title={item.title}
              subtitle={item.subtitle}
              price={`Rp ${item.price.toLocaleString("id-ID")}`}
              masa={item.masa}
              featuresLeft={item.featuresLeft}
              featuresRight={item.featuresRight}
              buttonText="Berlangganan Sekarang"
            />
          ))}
      </div>
    </div>
  );
}
