import React from 'react'
import FilterPeriode from '../../admin/dashboard/components/date'
import DashboardCard from '../../admin/dashboard/components/DashboardCard'
import StudentChart from './components/StudentChart'
import TeacherAreaChart from './components/TeacherAreaChart'
import TeacherBarChart from './components/TeacherBarChart'
import LatestTeacherList from './components/LatestTeacherList'
import { BookOpen, Users, GraduationCap, FileText } from 'lucide-react'
import { useDashboard } from './hooks/useDashboard'

const SchoolDashboard = () => {
  // Fetch data menggunakan custom hook
  const { data: dashboardData, loading, error, applyFilter, dateRange } = useDashboard()

  // Loading state
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  const getTrend = (key) => dashboardData.trendData?.[key] || null

  // Prepare dashboard cards data
  const dashboardCardsData = [
    {
      id: 1,
      title: "Total Kelas",
      value: dashboardData.countData.total_classes,
      icon: BookOpen,
      iconBgColor: "bg-orange-500",
      showTrend: Boolean(getTrend('classes_trend') && getTrend('classes_trend').type !== 'neutral'),
      trendValue: getTrend('classes_trend')?.value ?? 0,
      trendType: getTrend('classes_trend')?.type === 'down' ? 'down' : 'up',
      trendPeriod: getTrend('classes_trend')?.period || "30 hari"
    },
    {
      id: 2,
      title: "Total Pengajar",
      value: dashboardData.countData.total_teachers,
      icon: Users,
      iconBgColor: "bg-red-500",
      showTrend: Boolean(getTrend('teachers_trend') && getTrend('teachers_trend').type !== 'neutral'),
      trendValue: getTrend('teachers_trend')?.value ?? 0,
      trendType: getTrend('teachers_trend')?.type === 'down' ? 'down' : 'up',
      trendPeriod: getTrend('teachers_trend')?.period || "30 hari"
    },
    {
      id: 3,
      title: "Total Siswa",
      value: dashboardData.countData.total_students,
      icon: GraduationCap,
      iconBgColor: "bg-yellow-500",
      showTrend: Boolean(getTrend('students_trend') && getTrend('students_trend').type !== 'neutral'),
      trendValue: getTrend('students_trend')?.value ?? 0,
      trendType: getTrend('students_trend')?.type === 'down' ? 'down' : 'up',
      trendPeriod: getTrend('students_trend')?.period || "30 hari"
    },
    {
      id: 4,
      title: "Total Jurnal",
      value: dashboardData.countData.total_journals,
      icon: FileText,
      iconBgColor: "bg-blue-500",
      showTrend: Boolean(getTrend('journals_trend') && getTrend('journals_trend').type !== 'neutral'),
      trendValue: getTrend('journals_trend')?.value ?? 0,
      trendType: getTrend('journals_trend')?.type === 'down' ? 'down' : 'up',
      trendPeriod: getTrend('journals_trend')?.period || "30 hari"
    }
  ]

  // Transform data untuk chart components
  const chartData = {
    // Data untuk Area Chart (Chart Siswa)
    userData: dashboardData.chart_students.map(item => ({
      day: item.subject,
      users: item.siswa
    })),
    
    // Data untuk Chart Pengajar Terbaru (area)
    teacherAreaData: dashboardData.chart_teacher_addition.map(item => ({
      year: item.year,
      guruBaru: item.guru_baru
    })),
    
    // Data untuk Teacher Bar Chart
    teacherData: dashboardData.chart_teacher_addition.map(item => ({
      year: item.year,
      totalGuru: item.total_guru,
      guruBaru: item.guru_baru
    })),
    
    // Data untuk List Pengajar Terbaru
    latestTeachers: dashboardData.recent_teachers
  }

  return (
    <div className='min-h-screen'>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-[25px] font-bold text-gray-800">
              Dashboard
            </h1>
          </div>
          <FilterPeriode 
            value={dateRange}
            onApply={applyFilter}
          />
        </div>

        {/* Dashboard Cards */}
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

        {/* Charts Row 1 */}
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <StudentChart 
            data={chartData.userData}
            title="Chart Siswa"
            subtitle="Data Keseluruhan Anggota Atau Siswa"
          />
          <TeacherAreaChart 
            data={chartData.teacherAreaData}
            title="Chart Pengajar Terbaru"
            subtitle="Statistik penambahan pengajar"
          />
        </div>

        {/* Charts Row 2 */}
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className="lg:col-span-2">
            <TeacherBarChart 
              data={chartData.teacherData}
              title="Chart Penambahan Pengajar"
            />
          </div>
          <div className="lg:col-span-1">
            <LatestTeacherList data={chartData.latestTeachers} />
          </div>
        </div>
      </div> 
    </div>
  )
}

export { SchoolDashboard }
export default SchoolDashboard