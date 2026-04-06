import { useState, useEffect } from 'react';
import apiClient from '../../../../lib/axios';
import dummyData from '../data/dashboardDummy.json';

const USE_DUMMY = false;

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        let responseData;
        
        if (USE_DUMMY) {
          // Simulasi delay API
          await new Promise(resolve => setTimeout(resolve, 500));
          responseData = dummyData;
        } else {
          const response = await apiClient.get('/dashboard-school', {
            params: {
              date_from: dateRange.from,
              date_to: dateRange.to
            }
          });
          responseData = response.data.data;
        }
        
        // Transform data dari backend ke format yang dibutuhkan frontend
        const transformedData = transformBackendData(responseData);
        setData(transformedData);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        
        // Fallback ke dummy data jika error
        const transformedDummy = transformBackendData(dummyData);
        setData(transformedDummy);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange.from, dateRange.to]);

  // Function untuk refresh data
  const refetch = async () => {
    try {
      setLoading(true);
      
      let responseData;
      
      if (USE_DUMMY) {
        await new Promise(resolve => setTimeout(resolve, 500));
        responseData = dummyData;
      } else {
        const response = await apiClient.get('/dashboard-school', {
          params: {
            date_from: dateRange.from,
            date_to: dateRange.to
          }
        });
        responseData = response.data.data;
      }
      
      const transformedData = transformBackendData(responseData);
      setData(transformedData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to refetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = ({ from, to }) => {
    setDateRange({
      from: from || "",
      to: to || ""
    });
  };

  return { data, loading, error, refetch, isDummy: USE_DUMMY, applyFilter, dateRange };
};

export default useDashboard;

// Function untuk transform data dari backend ke format frontend
const mapTrend = (trend) => {
  if (!trend) return null;

  const normalizeType = (type) => {
    if (type === "decrease" || type === "down") return "down";
    if (type === "increase" || type === "up") return "up";
    return "neutral";
  };

  return {
    value: trend.value ?? 0,
    period: trend.period || "30 hari",
    type: normalizeType(trend.type),
  };
};

const transformBackendData = (backendData) => {
  const trendDataFromBackend = backendData.trendData
    ? {
        classes_trend: mapTrend(backendData.trendData.classes_trend),
        teachers_trend: mapTrend(backendData.trendData.teachers_trend),
        students_trend: mapTrend(backendData.trendData.students_trend),
        journals_trend: mapTrend(backendData.trendData.journals_trend),
      }
    : null;

  return {
    // Summary cards data
    countData: {
      total_classes: backendData.summary?.total_classrooms || 0,
      total_teachers: backendData.summary?.total_teachers || 0,
      total_students: backendData.summary?.total_students || 0,
      total_journals: backendData.summary?.total_journals || 0
    },
    
    // Trend data (jika backend belum provide, gunakan dummy)
    trendData: trendDataFromBackend,
    
    // Chart Students - transform dari backend
    chart_students: (backendData.chart_students || []).map(item => ({
      subject: item.lesson || item.subject,
      siswa: item.total_students || item.siswa || 0
    })),
    
    // Chart Transactions - transform dari backend
    chart_transactions: (backendData.chart_transactions || []).map(item => ({
      year: String(item.year),
      jumlah: item.total_transactions || item.jumlah || 0
    })),
    
    // Chart Teachers - transform dari backend
    chart_teacher_addition: (backendData.chart_teachers || []).map(item => ({
      year: String(item.year),
      total_guru: item.total_teachers || item.total_guru || 0,
      guru_baru: item.new_teachers || item.guru_baru || 0
    })),
    
    // Recent Teachers - transform dari backend
    recent_teachers: (backendData.latest_teachers || []).map(teacher => ({
      name: teacher.name,
      // Jika photo null, generate avatar dari nama
      avatar: teacher.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random&color=fff`,
      join_date: teacher.joined_at || teacher.join_date,
      status: "Bergabung Pada"
    }))
  };
};