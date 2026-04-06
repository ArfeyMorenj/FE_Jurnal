import { useState, useEffect } from 'react';
import { fetchApplications } from '../../../features/admin/application/services/applicationService';

/**
 * Hook untuk generate menu items aplikasi secara dinamis dari API
 * @returns {Object} { menuItems, isLoading, error }
 */
export const useApplicationMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchApplications();
        const applications = response.applications || [];
        
        // Generate menu items untuk setiap aplikasi dengan Section ID & App ID
        const generatedItems = applications.map((app) => {
          const sectionId = app.section?.id;
          const applicationId = app.id;
          
          return {
            label: app.name,
            applicationId: applicationId,
            sectionId: sectionId,
            children: [
              {
                label: 'Hero Section',
                to: `/admin/aplikasi/hero-section/${sectionId}`,
                sectionId: sectionId,
                type: 'section'
              },
              {
                label: 'Feature Section',
                to: `/admin/aplikasi/feature-section/${applicationId}`,
                applicationId: applicationId,
                type: 'application'
              },
              {
                label: 'Testimonial Section',
                to: `/admin/aplikasi/testimonial-section/${sectionId}`,
                sectionId: sectionId,
                type: 'section'
              },
              {
                label: 'FAQ Section',
                to: `/admin/aplikasi/faq-section/${sectionId}`,
                sectionId: sectionId,
                type: 'section'
              },
            ],
          };
        });

        setMenuItems(generatedItems);
      } catch (err) {
        setError(err.message || 'Gagal memuat daftar aplikasi');
        setMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  return { menuItems, isLoading, error };
};