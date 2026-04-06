import React from 'react';
import FilterPeriode from './components/date';
import DashboardCard from './components/DashboardCard';
import CustomLineChart from './components/LineChart';
import CustomBarChart from './components/BarChart';
import CustomAreaChart from './components/AreaChart';
import CustomAppChart from './components/AppChart';
import TeacherBarChart from './components/TeacherBarChart';
import PopularAppsList from './components/PopularAppsList';
import TestimonialCard from './components/TestimonialCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useDashboard } from './hooks/useDashboard';
import { useTestimonials } from './hooks/useTestimonials';
import { ChevronLeft , ChevronRight } from 'lucide-react';
import { useProfile } from '../rebuild/profile/hooks/useProfile';

export default function DashboardPage() {
  const [filterParams, setFilterParams] = React.useState({});
  const [dateRange, setDateRange] = React.useState({ from: "", to: "" });

  // Dashboard data hook
  const {
    loading,
    chartData,
    dashboardCardsData,
  } = useDashboard(filterParams);
  
  // Testimonials with pagination
  const {
    testimonials,
    isLoading: testimonialsLoading,
    pagination: testimonialsPagination,
    goToNextPage,
    goToPrevPage,
  } = useTestimonials(1, 2); // 2 items per page for dashboard display

  // User profile for greeting
  const { profile, isLoading: isLoadingProfile } = useProfile();

  const displayName = profile?.name || 'Admin';

  if (loading) {
    return (
      <div className='min-h-screen'>
        <div className='max-w-7xl mx-auto'>
          <LoadingSpinner text="Memuat data dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className="flex md:items-center md:justify-between mb-6 flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-[25px] font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 hidden md:block">
              {isLoadingProfile
                ? 'Halo, memuat profil...'
                : `Halo, ${displayName}, selamat datang kembali di panel admin MiJurnal.`}
            </p>
          </div>
          {/* FilterPeriode component */}
          <FilterPeriode
            value={dateRange}
            onFilterChange={({ date_from, date_to }) => {
              const nextRange = {
                from: date_from || "",
                to: date_to || "",
              };
              setDateRange(nextRange);
              setFilterParams({ date_from, date_to });
            }}
          />
        </div>

        {/* Stats Grid */}
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {dashboardCardsData.map((card) => (
            <DashboardCard
              key={card.id}
              title={card.title}
              value={card.value}
              icon={card.icon}
              iconBgColor={card.iconBgColor}
              showTrend={card.showTrend}
              trendValue={card.trendValue}
              trendType={card.trendType}
              trendPeriod={card.trendPeriod}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomLineChart data={chartData.websiteVisitorsData} />
          </div>
          <div className="lg:col-span-1">
            <CustomBarChart data={chartData.jumlahSiswaData} />
          </div>
        </div>
           <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
             <CustomAreaChart data={chartData.userData} />
             <CustomAppChart data={chartData.appData} />
           </div>
           <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
             <div className="lg:col-span-2">
               <TeacherBarChart data={chartData.teacherData} />
             </div>
             <div className="lg:col-span-1">
               <PopularAppsList data={chartData.popularAppsData} />
             </div>
           </div>
           <hr className='my-10 text-gray-300' />
           <div className='flex items-center justify-between'>
            <div>
           <h1 className='text-[#000405] text-[25px] font-bold'>Ulasan Pengguna</h1>
           <p className='text-[12px] text-[#000405]'>Beberapa ulasan / testimoni terbaru yang baru ditambahkan.</p>
           </div>
           <div className='grid grid-cols-2 gap-3'>
            <button
              onClick={goToPrevPage}
              disabled={testimonialsPagination.currentPage === 1 || testimonialsLoading}
              className={`bg-white w-[50px] h-[50px] rounded-lg flex items-center justify-center transition-colors ${
                testimonialsPagination.currentPage === 1 || testimonialsLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <ChevronLeft className={`${
                testimonialsPagination.currentPage === 1 || testimonialsLoading
                  ? 'text-gray-400'
                  : 'text-[#00B074]'
              }`} />
            </button>
            <button
              onClick={goToNextPage}
              disabled={testimonialsPagination.currentPage === testimonialsPagination.lastPage || testimonialsLoading}
              className={`bg-white w-[50px] h-[50px] rounded-lg flex items-center justify-center transition-colors ${
                testimonialsPagination.currentPage === testimonialsPagination.lastPage || testimonialsLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <ChevronRight className={`${
                testimonialsPagination.currentPage === testimonialsPagination.lastPage || testimonialsLoading
                  ? 'text-gray-400'
                  : 'text-[#00B074]'
              }`} />
            </button>
           </div>
           </div>
           {testimonialsLoading ? (
             <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>
               <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                 <div className='animate-pulse'>
                   <div className='h-4 bg-gray-200 rounded w-3/4 mb-4'></div>
                   <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                   <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                 </div>
               </div>
               <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                 <div className='animate-pulse'>
                   <div className='h-4 bg-gray-200 rounded w-3/4 mb-4'></div>
                   <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
                   <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                 </div>
               </div>
             </div>
           ) : testimonials.length > 0 ? (
             <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>
               {testimonials.map((testimonial) => (
                 <TestimonialCard key={testimonial.id} testimonial={testimonial} />
               ))}
             </div>
           ) : (
             <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>
               <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-500'>
                 Tidak ada ulasan pengguna
               </div>
             </div>
           )}
      </div>
    </div>
  );
}