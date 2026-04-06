import { useState, useEffect, useCallback } from "react";
import { getDashboardData } from "../services/dashboardService";
import { transformDashboardData } from "../utils/dataTransformers";
import { Toasts } from "../../../../utils/Toast";
import { LayoutGrid, UserRound, MessageSquareText, UsersRound } from "lucide-react";

/**
 * Custom hook for managing dashboard data
 * @returns {Object} Dashboard data, loading state, and helper functions
 */
export const useDashboard = (filterParams = {}) => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [transformedData, setTransformedData] = useState(null);

  const fetchDashboardData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await getDashboardData(params);

      if (response?.data) {
        setDashboardData(response.data);
        const transformed = transformDashboardData(response.data);
        setTransformedData(transformed);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.meta?.message || "Gagal memuat data dashboard";
      Toasts("error", 4000, "Error", errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(filterParams);
  }, [fetchDashboardData, filterParams.date_from, filterParams.date_to]);

  /**
   * Prepare dashboard cards data from countData
   */
  const getDashboardCardsData = useCallback(() => {
    if (!dashboardData?.countData) return [];

    const { countData } = dashboardData;

    return [
      {
        id: 1,
        title: "Total Aplikasi",
        value: String(countData.total_applications || 0),
        icon: LayoutGrid,
        iconBgColor: "bg-[#CA2323]",
        showTrend: false,
      },
      {
        id: 2,
        title: "Total Pengguna",
        value: String(countData.total_users || 0),
        icon: UserRound,
        iconBgColor: "bg-[#E45E14]",
        showTrend: false,
      },
      {
        id: 3,
        title: "Total Testimoni",
        value: String(countData.total_testimonials || 0),
        icon: MessageSquareText,
        iconBgColor: "bg-[#F0C419]",
        showTrend: false,
      },
      {
        id: 4,
        title: "Total Pengunjung",
        value: String(countData.total_visitor || 0),
        icon: UsersRound,
        iconBgColor: "bg-[#3B97D3]",
        showTrend: false,
      },
    ];
  }, [dashboardData]);

  // Chart data with fallbacks
  const chartData = {
    websiteVisitorsData: transformedData?.websiteVisitorsData || [],
    jumlahSiswaData: transformedData?.jumlahSiswaData || [],
    userData: transformedData?.userData || [],
    appData: transformedData?.appData || [],
    teacherData: transformedData?.teacherData || [],
    popularAppsData: transformedData?.popularAppsData || [],
  };

  return {
    loading,
    dashboardData,
    transformedData,
    chartData,
    dashboardCardsData: getDashboardCardsData(),
    refresh: fetchDashboardData,
  };
};

