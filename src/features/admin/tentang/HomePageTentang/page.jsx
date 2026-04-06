import React from 'react'
import { useNavigate } from 'react-router-dom'
import InfoBar from '../../../../components/common/InfoBar'
import BreadCrumbs from '../../../../components/common/BreadCrumbs'
import GridSection from '../../beranda/components/GridSection'
import NavCard from '../../../../components/common/NavCard'
import { Globe } from 'lucide-react'

const ApplicationPage = () => {
  const navigate = useNavigate()
  
  return (
    <>
    <div className='min-h-screen '>
      <div className='mb-6'>
        <BreadCrumbs />
        </div>
        <InfoBar
          message='Kustomisasi landing page agar sesuai kebutuhan bisnis Anda. Pilih section yang ingin diedit di bawah ini.'
        />
        <div className='mt-6 bg-white p-5 rounded-xl'>
          <div className='flex items-center justify-start gap-2'>
              <Globe className='text-[#CA2323]'/>
            <p className='text-[18px] font-bold text-[#000405]'>Pengaturan Halaman Tentang Kami</p>
          </div>
          <hr className='border-[#D9D9D9]/80 my-6'/>
          <div className="grid 
            grid-cols-1 
            lg:grid-cols-[auto_1fr_auto] 
            gap-4 
            items-center 
            justify-items-center">

            <img 
              src="/svg/pana.svg" 
              alt="" 
              className="w-full max-w-[250px] h-auto"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-10 justify-items-center">
              <NavCard
                icon="material-symbols:star-shine-rounded"
                title="Description Section"
                onClick={() => navigate("/admin/tentang/pages")}
              />
              <NavCard
                icon="ri:apps-2-ai-fill"
                title="Dev Team Section"
                onClick={() => navigate("/admin/tentang/tim-dev")}
              />
              <NavCard
                icon="wpf:faq"
                title="History Section"
                onClick={() => navigate("/admin/tentang/history")}
              />
              <NavCard
                icon="material-symbols:reviews"
                title="Sponsorship Section"
                onClick={() => navigate("/admin/tentang/sponsor")}
              />
            </div>

            <img 
              src="/svg/rafiki.svg" 
              alt="" 
              className="w-full max-w-[250px] h-auto"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicationPage
