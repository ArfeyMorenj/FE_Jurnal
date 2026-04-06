import { useState, useEffect, useCallback } from "react";
import { getTestimonials } from "../services/testimonialService";
import { SECTION_IDS } from "../../../../constants/sections";

/**
 * Custom hook for managing testimonials with pagination
 * @param {number} initialPage - Initial page number
 * @param {number} perPage - Items per page (default: 2 for dashboard display)
 * @returns {Object} Testimonials data and pagination controls
 */
export const useTestimonials = (
  initialPage = 1, 
  perPage = 2,
  sectionId = SECTION_IDS.LANDING_PAGE
) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    perPage: perPage,
    total: 0,
    lastPage: 1,
    nextPageUrl: null,
    prevPageUrl: null,
  });

  const loadTestimonials = useCallback(
    async (page) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getTestimonials({
          page,
          per_page: perPage,
          sectionId,
        });

        if (response?.data) {
          const testimonialsData = response.data.data || [];
          const paginationData = response.data.paginate || {};

          setTestimonials(testimonialsData);
          setPagination({
            currentPage: paginationData.current_page || page,
            perPage: paginationData.per_page || perPage,
            total: paginationData.total || 0,
            lastPage: paginationData.last_page || 1,
            nextPageUrl: paginationData.next_page_url,
            prevPageUrl: paginationData.prev_page_url,
          });
        }
      } catch (err) {
        setError("Gagal memuat ulasan pengguna.");
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    },
    [perPage, sectionId]
  );

  useEffect(() => {
    loadTestimonials(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPage = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
      loadTestimonials(page);
    }
  };

  const goToNextPage = () => {
    if (pagination.currentPage < pagination.lastPage) {
      setPage(pagination.currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination.currentPage > 1) {
      setPage(pagination.currentPage - 1);
    }
  };

  const refresh = () => loadTestimonials(pagination.currentPage);

  return {
    testimonials,
    isLoading,
    error,
    pagination,
    setPage,
    goToNextPage,
    goToPrevPage,
    refresh,
  };
};