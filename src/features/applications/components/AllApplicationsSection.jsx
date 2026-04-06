import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppSection from '../../home/components/AppSection';
import { highlightMiJurnal } from '../../../utils/highlightMiJurnal';
import Button from '../../../components/common/Button';
import { BsArrowRightCircle } from "react-icons/bs";
import { mapApplications } from '../utils/applicationMapper';
import { useAllApplications } from '../hooks/useAllApplications';
import LoadingSpinner from '../../../components/LoadingSpinner';

/**
 * Component untuk menampilkan SEMUA aplikasi aktif
 */
const AllApplicationsSection = ({ showViewAllButton = true }) => {
  const navigate = useNavigate();
  const { applications, isLoading } = useAllApplications();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const appSections = applications.length > 0 
    ? mapApplications(applications) 
    : [];

  const handleAppClick = (app) => {
    const sectionId = app.section?.id;
    const appId = app.id;
    const slug = app.slug;
    
    
    navigate(`/aplikasi/${slug}`, {
      state: {
        sectionId,
        applicationId: appId,
        applicationName: app.name
      }
    });
  };

  return (
    <section className='mx-8 my-16 md:mx-auto md:max-w-7xl'>
      <div className="flex justify-center">
        <h1 className='text-2xl md:text-5xl md:max-w-3xl text-center font-extrabold'>
          {highlightMiJurnal('Pilihan aplikasi serbaguna dalam satu platform MiJurnal')}
        </h1>
      </div>
      {appSections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada aplikasi tersedia saat ini.</p>
        </div>
      ) : (
        appSections.map((app, index) => (
          <AppSection
            key={app.id || `app-${index}`}
            title={app.name || app.title}
            description={app.description}
            buttonText={app.buttonText || "Lihat Detail"}
            buttonColor={app.textColor || app.buttonColor || "#DC143C"}  
            image={app.image}
            linkRoute={() => handleAppClick(app)}
            reverse={index % 2 === 1}
            mirror={index % 2 === 1}
            gradientColor1={app.gradientColor1}
            gradientColor2={app.gradientColor2}
          />
        ))
      )}

      {showViewAllButton && (
        <div className="flex justify-center">
          <Button
            to="/aplikasi"
            className="px-2 py-3 md:px-4 md:py-6 text-sm md:text-2xl font-semibold rounded-2xl transition-transform duration-200 border-2 border-primary-red text-primary-red inline-flex items-center gap-3 transition-all duration-500 ease-in-out hover:bg-primary-red hover:text-white hover:scale-105"
            rightIcon={<BsArrowRightCircle className='text-5 md:text-7' />}
          >
            Lihat Aplikasi Lainnya
          </Button>
        </div>
      )}
    </section>
  )
}

export default AllApplicationsSection