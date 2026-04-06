import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InfoBar from '../../../../components/common/InfoBar'
import BreadCrumbs from '../../../../components/common/BreadCrumbs'
import NavCard from '../../../../components/common/NavCard'
import { useSectionContext } from '../../../../contexts/useSectionContext'
import { SECTION_IDS } from '../../../../constants/sections'

const ApplicationPage = () => {
  const navigate = useNavigate()
  const { setSectionWithId } = useSectionContext()
  
  useEffect(() => {
    setSectionWithId(SECTION_IDS.APPLICATION, {
      pageName: 'Aplikasi',
      pageType: 'application'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNavigateToSection = (path, sectionName, sectionId = null) => {
    const targetSectionId = sectionId || SECTION_IDS.APPLICATION
    
    setSectionWithId(targetSectionId, {
      pageName: 'Aplikasi',
      pageType: 'application',
      currentSection: sectionName
    })
    
    navigate(`${path}/${targetSectionId}`)
  }
  
  return (
    <>
      <div className="min-h-screen">
        
        <div className="mb-6">
          <BreadCrumbs />
        </div>

        <InfoBar
          message="Kustomisasi landing page agar sesuai kebutuhan bisnis Anda. Pilih section yang ingin diedit di bawah ini."
        />

        <div className="mt-6 bg-white p-5 rounded-xl">
          
          <div className="flex items-center justify-start gap-2">
            <img src="/svg/icn.svg" alt="" />
            <p className="text-[18px] font-bold text-[#000405]">
              Pengaturan Halaman Daftar Aplikasi
            </p>
          </div>

          <hr className="border-[#D9D9D9]/80 my-6" />

          <div
            className="grid 
              grid-cols-1 
              lg:grid-cols-[auto_1fr_auto] 
              gap-4 
              items-center 
              justify-items-center"
          >         
            <img
              src="/svg/image93.svg"
              alt=""
              className="w-full max-w-full h-auto"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-10 justify-items-center">
              <NavCard
                icon="material-symbols:star-shine-rounded"
                title="Hero Section"
                onClick={() => handleNavigateToSection(
                  "/admin/aplikasi/hero-section", 
                  "Hero Section",
                  SECTION_IDS.APPLICATION
                )}
              />
              
              <NavCard
                icon="ri:apps-2-ai-fill"
                title="Apps Section"
                onClick={() => {
                  setSectionWithId(SECTION_IDS.APPLICATION, {
                    pageName: 'Aplikasi',
                    pageType: 'application',
                    currentSection: "Apps Section"
                  })
                  navigate("/admin/aplikasi/AppsSection")
                }}
              />
              
              <NavCard
                icon="material-symbols:reviews"
                title="Testimonial Section"
                onClick={() => handleNavigateToSection(
                  "/admin/aplikasi/testimonial-section", 
                  "Testimonial Section",
                  SECTION_IDS.APPLICATION
                )}
              />
              
              <NavCard
                icon="wpf:faq"
                title="FAQ Section"
                onClick={() => handleNavigateToSection(
                  "/admin/aplikasi/faq-section", 
                  "FAQ Section",
                  SECTION_IDS.APPLICATION
                )}
              />
            </div>
            <img
              src="/svg/cuate.svg"
              alt=""
              className="w-full max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicationPage