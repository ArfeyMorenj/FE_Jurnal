/**
 * Transform API response to chart data formats
 */

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthNamesDisplay = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const dayNamesEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Transform monthly_visitor to websiteVisitorsData format
 * @param {Object} monthlyVisitor - Object with year keys, each containing month keys
 * @returns {Array} Array of objects with month, visitors2024, visitors2025
 */
export const transformMonthlyVisitor = (monthlyVisitor) => {
  if (!monthlyVisitor || typeof monthlyVisitor !== 'object') {
    return monthNamesDisplay.map(month => ({
      month,
      visitors2024: 0,
      visitors2025: 0
    }));
  }

  const year2024 = monthlyVisitor["2024"] || {};
  const year2025 = monthlyVisitor["2025"] || {};
  
  return monthNames.map((month, index) => {
    return {
      month: monthNamesDisplay[index], // Display in Indonesian format
      visitors2024: year2024[month] || 0, // Use English month name for API data
      visitors2025: year2025[month] || 0 // Use English month name for API data
    };
  });
};

/**
 * Transform chart_users to userData format
 * @param {Object} chartUsers - Object with day keys and user counts
 * @returns {Array} Array of objects with day and users
 */
export const transformChartUsers = (chartUsers) => {
  return dayNamesEnglish.map((dayEnglish, index) => {
    const dayIndonesian = dayNames[index];
    const users = chartUsers[dayEnglish] || 0;
    
    return {
      day: dayIndonesian,
      users
    };
  });
};

/**
 * Transform chart_transactions to appData format
 * @param {Object} chartTransactions - Object with year keys and transaction counts
 * @returns {Array} Array of objects with year and transactions
 */
export const transformChartTransactions = (chartTransactions) => {
  if (!chartTransactions || typeof chartTransactions !== 'object') {
    return [];
  }
  
  return Object.keys(chartTransactions)
    .sort()
    .map(year => ({
      year,
      transactions: chartTransactions[year] || 0
    }));
};

/**
 * Transform chart_teacher to teacherData format
 * @param {Array} chartTeacher - Array of teacher data by year
 * @returns {Array} Array of objects with year, totalGuru, guruBaru
 */
export const transformChartTeacher = (chartTeacher) => {
  return chartTeacher.map(item => ({
    year: String(item.year),
    totalGuru: item.total_teachers || 0,
    guruBaru: item.new_teachers || 0
  }));
};

/**
 * Transform count_student_by_year to jumlahSiswaData format
 * @param {Object} countStudentByYear - Object with year keys and student counts
 * @returns {Array} Array of objects with year, tahunLalu, tahunIni
 */
export const transformJumlahSiswa = (countStudentByYear) => {
  if (!countStudentByYear || typeof countStudentByYear !== 'object') {
    return [];
  }

  const years = Object.keys(countStudentByYear)
    .map(year => parseInt(year))
    .sort((a, b) => a - b);

  if (years.length === 0) return [];

  const result = [];

  // Generate data for each year in the data
  years.forEach((year) => {
    const prevYear = year - 1;
    const prevYearData = countStudentByYear[String(prevYear)] || 0;
    const currentYearData = countStudentByYear[String(year)] || 0;
    
    result.push({
      year: String(year),
      tahunLalu: prevYearData,
      tahunIni: currentYearData
    });
  });

  return result;
};

/**
 * Transform popular_applications to popularAppsData format
 * @param {Array} popularApplications - Array of popular application objects
 * @returns {Array} Array of objects with name, icon, users
 */
export const transformPopularApps = (popularApplications) => {
  if (!Array.isArray(popularApplications)) {
    return [];
  }

  // Import getImageUrl dynamically to avoid circular dependency
  const getImageUrl = (path) => {
    if (!path) {
      return "/images/phone/phone1.png";
    }

    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    const BASE_STORAGE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    const storageUrl = BASE_STORAGE_URL.replace(/\/api\/?$/, "/storage");
    return `${storageUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };

  return popularApplications.map((app) => ({
    name: app.name || "Unknown App",
    icon: app.image ? getImageUrl(app.image) : "/images/phone/phone1.png",
    users: app.total_users || 0,
  }));
};

/**
 * Transform all dashboard data
 * @param {Object} apiData - Raw API response data
 * @returns {Object} Transformed data ready for components
 */
export const transformDashboardData = (apiData) => {
  if (!apiData) return null;
  
  return {
    countData: apiData.countData || {},
    websiteVisitorsData: transformMonthlyVisitor(apiData.monthly_visitor || {}),
    userData: transformChartUsers(apiData.chart_users || {}),
    appData: transformChartTransactions(apiData.chart_transactions || {}),
    teacherData: transformChartTeacher(apiData.chart_teacher || []),
    jumlahSiswaData: transformJumlahSiswa(apiData.count_student_by_year || {}),
    popularAppsData: transformPopularApps(apiData.popular_applications || [])
  };
};

