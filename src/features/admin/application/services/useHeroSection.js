import { useState, useEffect, useCallback } from 'react';
import { 
  fetchHeroSection, 
  createHeroSection
} from './heroService';
import { Toasts } from '../../../../utils/Toast';

export const useHeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHeroSection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { banners } = await fetchHeroSection();
      
      // Endpoint sudah filter berdasarkan section ID, tapi untuk aman kita filter lagi
      // Ambil banner terbaru (yang paling baru dibuat) dari section APPLICATION_HERO_SECTION
      const applicationBanners = banners.filter(banner => 
        banner.section?.id === 'a0706c49-e559-4c5b-871d-13496a3dc280'
      );
      
      // Sort by created_at descending untuk ambil yang terbaru
      const sortedBanners = applicationBanners.sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB - dateA;
      });
      
      // Ambil banner terbaru
      setHeroData(sortedBanners.length > 0 ? sortedBanners[0] : null);
    } catch (err) {
      setError('Gagal memuat data hero section.');
      setHeroData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createHero = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await createHeroSection(formData);
      const savedData = response.data;
      setHeroData(savedData);
      
      Toasts('success', 3000, 'Berhasil', 'Hero section berhasil dibuat');
      
      return savedData;
    } catch (err) {
      let errorMessage = 'Gagal membuat hero section';
      
      // Handle timeout error
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        errorMessage = 'Upload timeout. File mungkin terlalu besar atau koneksi lambat. Silakan coba lagi dengan file yang lebih kecil.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      Toasts('error', 3000, 'Error', errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHeroSection();
  }, [loadHeroSection]);

  return {
    heroData,
    isLoading,
    error,
    loadHeroSection,
    createHero,
    refresh: loadHeroSection,
  };
};

