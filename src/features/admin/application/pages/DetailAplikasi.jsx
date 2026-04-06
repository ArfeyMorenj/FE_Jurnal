import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import InfoBar from '../../../../components/common/InfoBar';
import BreadCrumbs from '../../../../components/common/BreadCrumbs';
import NavCard from '../../../../components/common/NavCard';
import { useSectionContext } from '../../../../contexts/useSectionContext';
import { getApplicationById } from '../services/appsService';
import { fetchApplications } from '../services/applicationService'; // ✅ Import langsung
import { Toasts } from '../../../../utils/Toast';

const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paramsId = useParams().applicationId || useParams().id;
  
  const applicationId = paramsId || location.state?.applicationId;
  const sectionIdFromState = location.state?.sectionId;
  
  const { setSectionWithId } = useSectionContext();
  
  const [isLoading, setIsLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);
  const [sectionId, setSectionId] = useState(sectionIdFromState || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!applicationId) {
        setError('Application ID tidak ditemukan');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        if (sectionIdFromState) {
          
          const appResult = await getApplicationById(sectionIdFromState, applicationId);
          
          if (!appResult.application) {
            throw new Error('Data aplikasi tidak ditemukan');
          }
          
          setApplicationData(appResult.application);
          setSectionId(sectionIdFromState);
          
          setSectionWithId(sectionIdFromState, {
            pageName: 'Aplikasi',
            pageType: 'application',
            applicationId: applicationId,
            applicationName: appResult.application.name,
            applicationSlug: appResult.application.slug
          });
        } 
        else {
          
          const allAppsResult = await fetchApplications();
          
          const foundApp = allAppsResult.applications?.find(app => app.id === applicationId);
          
          if (!foundApp) {
            throw new Error('Aplikasi tidak ditemukan');
          }
          
          const foundSectionId = foundApp.section?.id;
          
          if (!foundSectionId) {
            throw new Error('Section ID untuk aplikasi ini tidak ditemukan');
          }
          
          const appResult = await getApplicationById(foundSectionId, applicationId);
          
          setApplicationData(appResult.application);
          setSectionId(foundSectionId);
          
          setSectionWithId(foundSectionId, {
            pageName: 'Aplikasi',
            pageType: 'application',
            applicationId: applicationId,
            applicationName: appResult.application.name,
            applicationSlug: appResult.application.slug
          });
        }
        
        setError(null);
        
      } catch (err) {
        setError(err.message || 'Gagal memuat data aplikasi');
        Toasts('error', 3000, 'Gagal', err.message || 'Gagal memuat data aplikasi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId, sectionIdFromState]);

  const handleNavigateToSection = (path, sectionName) => {
    if (!sectionId) {
      Toasts('error', 3000, 'Gagal', 'Section ID tidak ditemukan');
      return;
    }

    setSectionWithId(sectionId, {
      pageName: 'Aplikasi',
      pageType: 'application',
      applicationId: applicationId,
      applicationName: applicationData?.name,
      applicationSlug: applicationData?.slug,
      currentSection: sectionName
    });
    
    navigate(`${path}/${sectionId}`, {
      state: {
        applicationId,
        applicationName: applicationData?.name,
        sectionId
      }
    });
  };

  const handleBack = () => {
    navigate('/admin/aplikasi/AppsSection');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#AA494E]" />
          <p className="mt-4 text-gray-600">Memuat data aplikasi...</p>
        </div>
      </div>
    );
  }

  if (error || !applicationData || !sectionId) {
    return (
      <div className="min-h-screen">
        <BreadCrumbs manual={[
          { label: "Aplikasi", path: "/admin/aplikasi" },
          { label: "Apps Section", path: "/admin/aplikasi/AppsSection" },
          { label: "Detail Aplikasi", path: "#" }
        ]} />
        
        <div className="mt-8 bg-white rounded-xl p-8 text-center">
          <p className="text-red-600 mb-4">{error || 'Data aplikasi tidak ditemukan'}</p>
          <button 
            onClick={handleBack}
            className="bg-[#AA494E] text-white px-6 py-2 rounded-lg hover:bg-[#8B3A3E] transition"
          >
            Kembali ke Daftar Aplikasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="mb-6">
          <BreadCrumbs manual={[
            { label: "Aplikasi", path: "/admin/aplikasi" },
            { label: "Apps Section", path: "/admin/aplikasi/AppsSection" },
            { label: applicationData.name, path: "#" }
          ]} />
        </div>

        <InfoBar
          message={`Kelola konten untuk aplikasi "${applicationData.name}". Pilih section yang ingin Anda edit di bawah ini.`}
        />

        <div className="mt-6 bg-white p-5 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              <img src="/svg/icn.svg" alt="" />
              <p className="text-[18px] font-bold text-[#000405]">
                Pengaturan {applicationData.name}
              </p>
            </div>           
          </div>

          <hr className="border-[#D9D9D9]/80 my-6" />

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center justify-items-center">
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
                  "Hero Section"
                )}
              />
              
              <NavCard
                icon="ri:apps-2-ai-fill"
                title="Features Section"
                onClick={() => navigate(`/admin/aplikasi/feature-section/${applicationId}`, {
                  state: {
                    applicationId,
                    applicationName: applicationData.name,
                    sectionId
                  }
                })}
              />
              
              <NavCard
                icon="material-symbols:reviews"
                title="Testimonial Section"
                onClick={() => handleNavigateToSection(
                  "/admin/aplikasi/testimonial-section",
                  "Testimonial Section"
                )}
              />
              
              <NavCard
                icon="wpf:faq"
                title="FAQ Section"
                onClick={() => handleNavigateToSection(
                  "/admin/aplikasi/faq-section",
                  "FAQ Section"
                )}
              />
            </div>
            
            <img
              src="/svg/cuate.svg"
              alt=""
              className="w-full max-w-full h-auto"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleBack}
              className="bg-[#8B8B8B] text-white px-6 py-2 rounded-xl hover:bg-[#6B6B6B] transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationDetailPage;