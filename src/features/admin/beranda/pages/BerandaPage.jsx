import InfoBar from "../../../../components/common/InfoBar"
import BreadCrumbs from "../../../../components/common/BreadCrumbs"
import GridSection from "../components/GridSection"
import { IoHome } from "react-icons/io5";

const BerandaPage = () => {
  return (
    <div className='flex flex-col gap-6 max-w-7xl'>
      <BreadCrumbs />

      <InfoBar
         message='Kustomisasi landing page agar sesuai kebutuhan bisnis Anda. Pilih section yang ingin diedit di bawah ini.'
      />
      
      <div className="bg-white p-5 rounded-[10px]">
        <h2 className="inter font-semibold text-sm text-lg mb-6 flex items-center gap-2 text-[#000405]">
          <span className="text-primary-red"><IoHome size={20} /></span> 
          Pengaturan Halaman Utama (Beranda)
        </h2>
        <hr className="border-[#D9D9D9]/80 mb-6" />

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2 py-2 md:py-8">
            <GridSection />
          </div>

          <img
            src="/images/illustration2.png"
            alt="Ilustrasi"
            className="
              hidden lg:block
              absolute -bottom-5 right-0 
              w-[355px] object-contain
              pointer-events-none
            "
          />
        </div>
      </div>
    </div>
  )
}

export default BerandaPage
